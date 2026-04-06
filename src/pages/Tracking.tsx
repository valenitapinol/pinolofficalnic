import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { Clock, MapPin, Phone } from 'lucide-react';

export default function Tracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(5); // minutos estimados

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', orderId)
        .single();
      setOrder(data);
    };
    fetchOrder();

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <div className="p-4">Cargando...</div>;

  return (
    <div>
      <Header />
      <main className="p-4">
        <div className="bg-green-50 p-4 rounded-xl text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">¡Pedido en camino!</h2>
          <p className="text-gray-600">Tu pedido está en camino y llegará pronto a tu domicilio.</p>
          <p className="text-3xl font-bold mt-2">#{order.id.slice(-4)}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Clock className="w-5 h-5" />
            <span className="text-xl font-semibold">~{timeLeft} min</span>
          </div>
        </div>

        <div className="border rounded-xl p-4 mb-4">
          <h3 className="font-bold text-lg">Comedor Pinolero</h3>
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.quantity} x {item.products?.name}</span>
              <span>C$ {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>C$ {order.total}</span>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <h3 className="font-bold">Joel M.</h3>
          <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +505 8888-9999</p>
          <p className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" /> Tu ubicación</p>
        </div>

        <Link to="/orders" className="block mt-6 bg-red-600 text-white text-center py-3 rounded-full">
          Seguir pedido
        </Link>
      </main>
    </div>
  );
}
