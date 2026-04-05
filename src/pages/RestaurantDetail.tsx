import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { type MenuItem as MenuItemType } from '../types';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

const mockMenus: Record<number, MenuItemType[]> = {
  1: [
    { id: 101, restaurantId: 1, name: 'Nacatamal', description: 'Nacatamal cerdo', price: 120 },
    { id: 102, restaurantId: 1, name: 'Gallo pinto', description: 'Con maduro', price: 90 },
  ],
  2: [
    { id: 201, restaurantId: 2, name: 'Quesillo', description: 'Con cuajada', price: 80 },
    { id: 202, restaurantId: 2, name: 'Indio viejo', description: 'Carne desmenuzada', price: 150 },
  ],
  3: [
    { id: 301, restaurantId: 3, name: 'Pizza pepperoni', description: 'Mediana', price: 250 },
    { id: 302, restaurantId: 3, name: 'Pizza hawaiana', description: 'Mediana', price: 270 },
  ],
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurantId = Number(id);
  const addToCart = useStore((state) => state.addToCart);
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      if (supabase) {
        try {
          const { data } = await supabase
            .from('products')
            .select('*')
            .eq('restaurant_id', restaurantId);
          if (data && data.length) setMenu(data);
          else setMenu(mockMenus[restaurantId] || []);
        } catch {
          setMenu(mockMenus[restaurantId] || []);
        }
      } else {
        setMenu(mockMenus[restaurantId] || []);
      }
    };
    fetchMenu();
  }, [restaurantId]);

  const handleAddToCart = (item: MenuItemType) => {
    addToCart({ ...item, quantity: 1 });
    toast.success(`${item.name} añadido al carrito`);
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-bold">Menú</h2>
        <div className="space-y-3 mt-4">
          {menu.map((item) => (
            <div key={item.id} className="border p-3 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-green-700 font-semibold">${item.price}</p>
              </div>
              <button onClick={() => handleAddToCart(item)} className="bg-red-600 text-white px-4 py-2 rounded-full">
                Agregar
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
