import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { MapPin, DollarSign, MessageSquare, Truck } from 'lucide-react';

export default function Checkout() {
  const { cart, getTotal, clearCart, user } = useStore();
  const total = getTotal();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [address, setAddress] = useState('De Rotonda Metrocentro 200m norte, Managua');
  const [notes, setNotes] = useState('');
  const [phone, setPhone] = useState('+505 8888-1234');
  const [loading, setLoading] = useState(false);

  const delivery_fee = 150;
  const subtotal = total;
  const final_total = subtotal + delivery_fee;

  const handleConfirm = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión');
      navigate('/login');
      return;
    }

    if (!address.trim()) {
      toast.error('Por favor ingresa una dirección');
      return;
    }

    setLoading(true);

    try {
      // Guardar información del pedido en sesión/storage
      sessionStorage.setItem('checkout_data', JSON.stringify({
        cart,
        address,
        phone,
        notes,
        total: final_total,
      }));

      toast.success('✅ Proceder al pago');
      
      // Redirigir a página de pago
      setTimeout(() => {
        navigate('/payment');
      }, 800);
    } catch (error) {
      console.error(error);
      toast.error('Error al procesar el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <main className="p-4 text-center py-12">
          <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-full"
          >
            Volver a la tienda
          </button>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="p-4 pb-24">
        <h1 className="text-2xl font-bold mb-4">Confirmación del Pedido</h1>

        {/* Resumen del carrito */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-bold mb-3">📋 Tu pedido</h2>
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">C$ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dirección de entrega */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-2 font-bold">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span>Dirección de entrega</span>
          </div>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={3}
          />
        </div>

        {/* Teléfono de contacto */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-2 font-bold">
            <span>📱 Teléfono de contacto</span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Notas especiales */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-2 font-bold">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <span>Notas especiales</span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: Sin picante, sin tomate, etc."
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            rows={2}
          />
        </div>

        {/* Métodos de pago */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-3 font-bold">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>Método de pago</span>
          </div>
          <div className="space-y-2">
            {[
              { id: 'cash', label: '💵 Efectivo al recibir' },
              { id: 'card', label: '💳 Tarjeta' },
              { id: 'transfer', label: '📱 Transferencia' },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="mr-3 w-5 h-5"
                />
                <span className="font-medium">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tiempo de entrega */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4 flex items-start gap-3">
          <Truck className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-bold text-blue-900">Tiempo estimado de entrega</p>
            <p className="text-sm text-blue-700">25-40 minutos</p>
          </div>
        </div>

        {/* Desglose de costos */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>C$ {subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Envío</span>
            <span className="text-green-600 font-medium">C$ {delivery_fee}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-red-600">C$ {final_total}</span>
          </div>
        </div>

        {/* Botón de confirmación */}
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Procesando...' : `✅ Confirmar pedido (C$ ${final_total})`}
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Al confirmar, aceptas nuestros términos y condiciones
        </p>
      </main>
    </div>
  );
}
