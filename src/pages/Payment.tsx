import { useState } from 'react';
import { CheckCircle, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Efectivo',
    icon: '💵',
    description: 'Paga en efectivo al recibir tu pedido',
  },
  {
    id: 'bac',
    name: 'BAC Credomatic',
    icon: '🏦',
    description: 'Tarjeta de crédito/débito BAC',
  },
  {
    id: 'banpro',
    name: 'Banpro',
    icon: '🏦',
    description: 'Tarjeta de crédito/débito Banpro',
  },
  {
    id: 'avanza',
    name: 'Banco Avanza',
    icon: '🏦',
    description: 'Tarjeta de crédito/débito Avanza',
  },
  {
    id: 'transfer',
    name: 'Transferencia Bancaria',
    icon: '💻',
    description: 'Transfiere desde tu banco',
  },
];

export default function Payment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [completed, setCompleted] = useState(false);

  const total = 1400; // del carrito
  const fee = selectedMethod === 'cash' ? 0 : 50;
  const finalTotal = total + fee;

  const handleCardChange = (e: any) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (selectedMethod === 'cash') {
      setIsProcessing(true);
      setTimeout(() => {
        setCompleted(true);
        toast.success('✅ Pago confirmado. Efectivo al recibir.');
        setTimeout(() => navigate('/orders'), 2000);
      }, 1500);
      return;
    }

    if (selectedMethod.includes('transfer')) {
      setIsProcessing(true);
      setTimeout(() => {
        setCompleted(true);
        toast.success('✅ Transferencia iniciada. Por favor confirma en tu banco.');
        setTimeout(() => navigate('/orders'), 2000);
      }, 1500);
      return;
    }

    // Validar tarjeta
    if (!cardData.cardNumber || !cardData.cardHolder || !cardData.cvv) {
      toast.error('Por favor completa todos los datos de la tarjeta');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setCompleted(true);
      toast.success('✅ Pago procesado exitosamente');
      setTimeout(() => navigate('/orders'), 2000);
    }, 2000);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">¡Pago Confirmado!</h2>
          <p className="text-gray-600 mb-6">Tu pedido es número #12345</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-600 text-sm mb-2">Total pagado</p>
            <p className="text-3xl font-bold text-gray-800">C$ {finalTotal}</p>
          </div>
          <p className="text-gray-600 text-sm">
            Tu pedido será entregado en 25-40 minutos. Recibirás actualizaciones en vivo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Método de Pago</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Métodos de pago */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Selecciona tu método de pago</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{method.icon}</span>
                        <p className="font-bold">{method.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Información de tarjeta */}
            {selectedMethod && ['bac', 'banpro', 'avanza'].includes(selectedMethod) && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Información de la Tarjeta
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={cardData.cardHolder}
                      onChange={handleCardChange}
                      placeholder="JUAN PEREZ"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mes
                      </label>
                      <select
                        name="expiryMonth"
                        value={cardData.expiryMonth}
                        onChange={handleCardChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Año
                      </label>
                      <select
                        name="expiryYear"
                        value={cardData.expiryYear}
                        onChange={handleCardChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <option value="">YY</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={String(year).slice(-2)}>
                              {String(year).slice(-2)}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advertencia de seguridad */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                🔒 Tus datos de pago están protegidos con encriptación SSL. Nunca compartimos tu información con terceros.
              </p>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold mb-4">Resumen del Pedido</h2>

              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>2x Nacatamal</span>
                  <span>C$ 240</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>1x Gallo pinto</span>
                  <span>C$ 90</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>1x Café</span>
                  <span>C$ 50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío gratis</span>
                  <span className="text-green-600">Gratis</span>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span>C$ {total}</span>
              </div>

              {fee > 0 && (
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-600">Comisión (pago electrónico)</span>
                  <span>C$ {fee}</span>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between font-bold text-lg mb-6">
                <span>Total a pagar</span>
                <span className="text-red-600">C$ {finalTotal}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Procesando...' : `Pagar C$ ${finalTotal}`}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Al hacer clic en "Pagar", aceptas los términos de servicio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
