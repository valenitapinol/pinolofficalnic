import { useEffect, useState } from 'react';
import Header from '../components/Header';
import RestaurantCard from '../components/RestaurantCard';
import MenuItem from '../components/MenuItem';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Restaurant {
  id: number;
  name: string;
  rating: number;
  time: number;
  price: number;
  image?: string;
  category?: string;
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('restaurants')
          .select('id, name');

        if (error || !data) {
          // Fallback a datos mock si hay error o no hay datos
          setRestaurants([
            { id: 1, name: 'El Patio - Comida Típica', rating: 4.5, time: 25, price: 550, category: 'Típico' },
            { id: 2, name: 'Pupusas Express', rating: 4.2, time: 20, price: 420, category: 'Pupusas' },
            { id: 3, name: 'Pizza Italiana', rating: 4.3, time: 35, price: 680, category: 'Pizza' },
            { id: 4, name: 'Pollo con Tajadas', rating: 4.1, time: 30, price: 520, category: 'Típico' },
            { id: 5, name: 'Anafre - Mariscos', rating: 4.4, time: 40, price: 750, category: 'Mariscos' },
            { id: 6, name: 'Hamburguesas USA', rating: 4.0, time: 25, price: 480, category: 'Hamburguesas' },
          ]);
        } else {
          const mapped = data.map(r => ({
            id: r.id,
            name: r.name,
            rating: 4.2,
            time: 25,
            price: 550,
            category: 'Restaurante',
          }));
          setRestaurants(mapped);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Fallback a datos mock
        setRestaurants([
          { id: 1, name: 'El Patio - Comida Típica', rating: 4.5, time: 25, price: 550, category: 'Típico' },
          { id: 2, name: 'Pupusas Express', rating: 4.2, time: 20, price: 420, category: 'Pupusas' },
          { id: 3, name: 'Pizza Italiana', rating: 4.3, time: 35, price: 680, category: 'Pizza' },
          { id: 4, name: 'Pollo con Tajadas', rating: 4.1, time: 30, price: 520, category: 'Típico' },
          { id: 5, name: 'Anafre - Mariscos', rating: 4.4, time: 40, price: 750, category: 'Mariscos' },
          { id: 6, name: 'Hamburguesas USA', rating: 4.0, time: 25, price: 480, category: 'Hamburguesas' },
        ]);
      }
      setLoading(false);
    };
    fetchRestaurants();
  }, []);

  const offers = [
    { title: 'Combo Típico Completo', description: 'Anafre, tamales, plátano, café', oldPrice: 560, price: 450 },
    { title: 'Pupusas Mixtas (3)', description: 'Queso, frijol, chicharrón', oldPrice: 180, price: 150 },
    { title: 'Pizza Familiar', description: 'Grande con 4 ingredientes', oldPrice: 850, price: 720 },
    { title: 'Pollo con Tajadas', description: 'Pechuga, chimol, encurtido', oldPrice: 520, price: 480 },
  ];

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando PinolApp...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      <Header />
      <main className="p-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl mb-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a PinolApp! 🇳🇮</h1>
          <p className="text-red-100 mb-4">La mejor comida nicaragüense a tu puerta</p>
          <div className="flex items-center text-sm text-red-100">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Entrega en toda Managua</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar restaurantes, comida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <Clock className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-medium">25-40 min</p>
            <p className="text-xs text-gray-500">Tiempo promedio</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium">4.2★</p>
            <p className="text-xs text-gray-500">Calificación</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <MapPin className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Gratis</p>
            <p className="text-xs text-gray-500">Envío</p>
          </div>
        </div>

        {/* Restaurants Section */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Restaurantes Cercanos</h3>
            <span className="text-sm text-gray-500">{filteredRestaurants.length} disponibles</span>
          </div>
          <div className="space-y-3">
            {filteredRestaurants.map((r) => (
              <Link to={`/restaurant/${r.id}`} key={r.id}>
                <RestaurantCard {...r} />
              </Link>
            ))}
          </div>
        </section>

        {/* Offers Section */}
        <section className="mb-6">
          <h3 className="font-bold text-lg mb-3">🔥 Ofertas del Día</h3>
          <div className="grid grid-cols-1 gap-3">
            {offers.map((o, i) => <MenuItem key={i} {...o} />)}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-6">
          <h3 className="font-bold text-lg mb-3">Categorías Populares</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Típico', 'Pizza', 'Mariscos', 'Hamburguesas', 'Pupusas', 'Desayunos'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchTerm(cat)}
                className="bg-white p-4 rounded-xl shadow-sm text-center hover:bg-red-50 transition-colors"
              >
                <p className="font-medium text-gray-800">{cat}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-around shadow-lg">
        <Link to="/cart" className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md font-medium hover:bg-red-700 transition-colors">
          🛒 Ver Carrito
        </Link>
        <Link to="/login" className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-full font-medium hover:bg-red-50 transition-colors">
          👤 Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
