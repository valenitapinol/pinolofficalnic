import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import { format } from 'date-fns';

export default function Orders() {
  const { orders, fetchOrders, user } = useStore();

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div className="p-4">Inicia sesión para ver tus pedidos</div>;

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
        {orders.length === 0 && <p>No hay pedidos aún.</p>}
        {orders.map((order) => (
          <div key={order.id} className="border p-3 rounded-xl mb-3">
            <p className="font-bold">Pedido #{order.id}</p>
            <p>Fecha: {format(new Date(order.created_at || order.date), 'dd/MM/yyyy HH:mm')}</p>
            <p>Total: ${order.total}</p>
            <p>Estado: {order.status}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
