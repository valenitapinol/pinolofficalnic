import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { type MenuItem as MenuItemType } from '../types';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Star, Clock, MapPin, Phone, Share2, Heart } from 'lucide-react';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  time: number;
  price: number;
  category: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  image: string;
}

const mockRestaurants: Record<number, Restaurant> = {
  1: {
    id: 1,
    name: 'El Patio - Comida Típica',
    rating: 4.5,
    reviews: 328,
    time: 25,
    price: 550,
    category: 'Típico',
    description: 'Los mejores platos típicos nicaragüenses en Managua. Comida fresca y auténtica.',
    phone: '+505 2254-3344',
    address: 'Centro Comercial La Pólvora, Managua',
    hours: '10:00 AM - 10:00 PM',
    image: '🏪',
  },
  2: {
    id: 2,
    name: 'Pupusas Express',
    rating: 4.2,
    reviews: 245,
    time: 20,
    price: 420,
    category: 'Pupusas',
    description: 'Pupusas recién hechas con los mejores ingredientes. Tradicionales y modernas.',
    phone: '+505 2256-5566',
    address: 'Barrio Jalteva, Managua',
    hours: '8:00 AM - 9:00 PM',
    image: '🥙',
  },
  3: {
    id: 3,
    name: 'Pizza Italiana',
    rating: 4.3,
    reviews: 512,
    time: 35,
    price: 680,
    category: 'Pizza',
    description: 'Pizzas auténticas hecha en horno de leña con ingredientes importados.',
    phone: '+505 2270-1122',
    address: 'Barrio Los Robles, Managua',
    hours: '11:00 AM - 11:00 PM',
    image: '🍕',
  },
  4: {
    id: 4,
    name: 'Pollo con Tajadas',
    rating: 4.1,
    reviews: 189,
    time: 30,
    price: 520,
    category: 'Típico',
    description: 'Pollo criollo a la leña con tajadas de plátano. El favorito del pueblo.',
    phone: '+505 2252-7788',
    address: 'Mercado Huembes, alrededores',
    hours: '10:00 AM - 10:00 PM',
    image: '🍗',
  },
  5: {
    id: 5,
    name: 'Anafre - Mariscos',
    rating: 4.4,
    reviews: 623,
    time: 40,
    price: 750,
    category: 'Mariscos',
    description: 'Mariscos frescos del día. Ceviche, camarones, langosta y más en Las Peñitas.',
    phone: '+505 2263-4455',
    address: 'Frente al mar, Las Peñitas',
    hours: '9:00 AM - 9:00 PM',
    image: '🦐',
  },
  6: {
    id: 6,
    name: 'Hamburguesas USA',
    rating: 4.0,
    reviews: 156,
    time: 25,
    price: 480,
    category: 'Hamburguesas',
    description: 'Hamburguesas caseras con ingredientes premium. Estilo americano con toque local.',
    phone: '+505 2255-9900',
    address: 'Multiplaza, Managua',
    hours: '10:00 AM - 11:00 PM',
    image: '🍔',
  },
};

const mockMenus: Record<number, MenuItemType[]> = {
  1: [
    { id: 101, restaurantId: 1, name: 'Nacatamal', description: 'Nacatamal cerdo con salsa roja', price: 120 },
    { id: 102, restaurantId: 1, name: 'Gallo pinto', description: 'Con huevo frito y cuajada', price: 90 },
    { id: 103, restaurantId: 1, name: 'Tres leches', description: 'Postre típico nicaragüense', price: 80 },
    { id: 104, restaurantId: 1, name: 'Anafre completo', description: 'Queso, maduro, frijoles, cuajada', price: 250 },
  ],
  2: [
    { id: 201, restaurantId: 2, name: 'Quesillo', description: 'Con cuajada y salsa roja', price: 80 },
    { id: 202, restaurantId: 2, name: 'Indio viejo', description: 'Carne desmenuzada en salsa', price: 150 },
    { id: 203, restaurantId: 2, name: 'Pupusa de queso', description: 'Rellena de queso fresco', price: 75 },
    { id: 204, restaurantId: 2, name: 'Pupusa mixta', description: 'Queso, frijol, chicharrón', price: 85 },
  ],
  3: [
    { id: 301, restaurantId: 3, name: 'Pizza pepperoni', description: 'Mediana con 5 ingredientes', price: 250 },
    { id: 302, restaurantId: 3, name: 'Pizza hawaiana', description: 'Mediana con piña', price: 270 },
    { id: 303, restaurantId: 3, name: 'Pizza 4 quesos', description: 'Mozzarella, parmesano, cheddar, azul', price: 280 },
    { id: 304, restaurantId: 3, name: 'Pasta Carbonara', description: 'Con jamón y queso', price: 200 },
  ],
  4: [
    { id: 401, restaurantId: 4, name: 'Pollo con tajadas', description: 'Pechuga a la leña', price: 520 },
    { id: 402, restaurantId: 4, name: 'Muslos con tajadas', description: 'Muslos criados a fuego', price: 480 },
    { id: 403, restaurantId: 4, name: 'Pollo completo', description: 'Pollo entero con 4 acompañamientos', price: 750 },
  ],
  5: [
    { id: 501, restaurantId: 5, name: 'Ceviche de camarón', description: 'Fresco del día', price: 350 },
    { id: 502, restaurantId: 5, name: 'Camarones al ajillo', description: 'Con arroz y ensalada', price: 400 },
    { id: 503, restaurantId: 5, name: 'Langosta', description: 'Fresca con mantequilla', price: 600 },
  ],
  6: [
    { id: 601, restaurantId: 6, name: 'Hamburguesa simple', description: 'Con tomate, lechuga, cebolla', price: 120 },
    { id: 602, restaurantId: 6, name: 'Hamburguesa doble', description: '2 carnes, queso, tocino', price: 200 },
    { id: 603, restaurantId: 6, name: 'Combo completo', description: 'Hamburguesa, papas, bebida', price: 300 },
  ],
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const restaurantId = Number(id);
  const addToCart = useStore((state) => state.addToCart);
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const restaurant = mockRestaurants[restaurantId];
    setRestaurant(restaurant);

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

  if (!restaurant) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p>Cargando restaurante...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="pb-24">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 text-center relative">
          <div className="text-6xl mb-2">{restaurant.image}</div>
          <h1 className="text-2xl font-bold mb-1">{restaurant.name}</h1>
          <p className="text-red-100 text-sm">{restaurant.category}</p>

          {/* Botones de acción */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
            <button className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Información rápida */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-white shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">{restaurant.rating}</span>
            </div>
            <p className="text-xs text-gray-600">{restaurant.reviews} reseñas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-bold">{restaurant.time} min</span>
            </div>
            <p className="text-xs text-gray-600">Tiempo de entrega</p>
          </div>
        </div>

        {/* Detalles del restaurante */}
        <div className="p-4 space-y-4">
          {/* Descripción */}
          <div className="bg-blue-50 p-4 rounded-xl">
            <p className="text-gray-700">{restaurant.description}</p>
          </div>

          {/* Información de contacto */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <a href={`tel:${restaurant.phone}`} className="text-gray-800 hover:text-green-600">
                {restaurant.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="text-gray-800">{restaurant.address}</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
              <p className="text-gray-800">{restaurant.hours}</p>
            </div>
          </div>

          {/* Menú */}
          <div>
            <h2 className="text-xl font-bold mb-3">📋 Menú</h2>
            <div className="space-y-3">
              {menu.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      <p className="text-lg font-bold text-red-600 mt-2">C$ {item.price}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-full whitespace-nowrap hover:bg-red-700 transition-colors font-medium"
                    >
                      + Agregar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botón flotante del carrito */}
        <Link
          to="/cart"
          className="fixed bottom-6 left-4 right-4 bg-red-600 text-white py-3 rounded-full font-bold text-center hover:bg-red-700 transition-colors shadow-lg"
        >
          🛒 Ver Carrito
        </Link>
      </main>
    </div>
  );
}
