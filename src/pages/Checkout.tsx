import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const { cart, getTotal, clearCart, user } = useStore();
  const total = getTotal();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión');
      navigate('/login');
      return;
    }

    // Obtener el restaurant_id del primer producto (asumimos que todos los items son del mismo restaurante)
    const restaurantId = cart[0]?.restaurantId;
    if (!restaurantId) {
      toast.error('Carrito vacío');
      return;
    }

    // 1. Insertar el pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        restaurant_id: restaurantId,
        total: total,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error(orderError);
      toast.error('Error al crear el pedido');
      return;
    }

    // 2. Insertar los items del pedido
    const items = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(items);
    if (itemsError) {
      console.error(itemsError);
      toast.error('Error al guardar los items');
      return;
    }

    toast.success('Pedido realizado');
    clearCart();
    sed -i 's|navigate('/orders')|navigate(`/tracking/${order.id}`)|' src/pages/Checkout.tsx
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold mb-4">Confirmar Pedido</h2>
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="font-bold">Total: ${total}</p>
          <p className="text-sm text-gray-600 mt-2">Dirección: (mock) Barrio San Judas, Managua</p>
        </div>
        <button onClick={handleConfirm} className="w-full bg-green-600 text-white py-3 rounded-full mt-6">Confirmar Pedido</button>
      </main>
    </div>
  );
}
