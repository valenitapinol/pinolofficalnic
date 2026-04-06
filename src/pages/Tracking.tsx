import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import DriverMap from '../components/DriverMap';
import ChatBox from '../components/ChatBox';
import { TrendingUp } from 'lucide-react';

interface Order {
  id: string;
  status: 'preparing' | 'ready' | 'on_way' | 'delivered';
  total: number;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  restaurant_name: string;
  delivery_address: string;
  estimated_delivery: number;
}

const mockOrder: Order = {
  id: '12345',
  status: 'on_way',
  total: 1250,
  items: [
    { id: 101, name: 'Nacatamal', quantity: 2, price: 120 },
    { id: 102, name: 'Gallo pinto', quantity: 1, price: 90 },
  ],
  restaurant_name: 'El Patio - Comida Típica',
  delivery_address: 'De Rotonda Metrocentro 200m norte, Managua',
  estimated_delivery: 18,
};

const drivers = [
  { name: 'Joel M.', rating: 4.8, phone: '+505 8888-9999' },
  { name: 'Carlos L.', rating: 4.9, phone: '+505 7777-8888' },
  { name: 'Pedro R.', rating: 4.7, phone: '+505 6666-7777' },
];

const getRandomDriver = () => drivers[Math.floor(Math.random() * drivers.length)];

export default function Tracking() {
  const { orderId } = useParams();
  const [order] = useState<Order>(mockOrder);
  const [timeLeft, setTimeLeft] = useState(mockOrder.estimated_delivery);
  const [activeTab, setActiveTab] = useState<'tracking' | 'chat'>('tracking');
  const [driver] = useState(getRandomDriver());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const statusSteps = [
    { status: 'preparing', label: 'Preparando', icon: '👨‍🍳' },
    { status: 'ready', label: 'Listo', icon: '✅' },
    { status: 'on_way', label: 'En camino', icon: '🚗' },
    { status: 'delivered', label: 'Entregado', icon: '📦' },
  ];

  const currentStatusIndex = statusSteps.findIndex((s) => s.status === order.status);

  return (
    <div>
      <Header />
      <main className="p-4 pb-24">
        {/* Estado del pedido */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl mb-4 border-l-4 border-red-600">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-600 text-sm">Pedido #{order.id}</p>
              <h2 className="text-2xl font-bold text-red-600">¡Pedido en camino! 🚗</h2>
            </div>
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-700">Tu pedido llegará a tu domicilio en aproximadamente {timeLeft} minutos.</p>
        </div>

        {/* Progreso del pedido */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            {statusSteps.map((step, index) => (
              <div key={step.status} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-2 transition-all ${
                    index <= currentStatusIndex ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.icon}
                </div>
                <p className="text-xs text-center font-medium text-gray-600">{step.label}</p>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`w-1 h-6 mt-2 ${index < currentStatusIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'tracking'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📍 Seguimiento
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            💬 Chat
          </button>
        </div>

        {/* Contenido de tabs */}
        {activeTab === 'tracking' && (
          <div>
            {/* Mapa del driver */}
            <DriverMap
              driverName={driver.name}
              driverRating={driver.rating}
              driverPhone={driver.phone}
            />

            {/* Detalles del restaurante */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border-t-4 border-green-500">
              <h3 className="font-bold text-lg mb-2">🏪 Restaurante</h3>
              <p className="font-semibold text-gray-800">{order.restaurant_name}</p>
              <p className="text-sm text-gray-600 mt-1">Tiempo de preparación: ~5 min</p>
              <div className="mt-3 p-2 bg-green-50 rounded-lg">
                <p className="text-xs text-green-700 font-medium">✅ Pedido confirmado</p>
              </div>
            </div>

            {/* Detalles de entrega */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border-t-4 border-blue-500">
              <h3 className="font-bold text-lg mb-2">📦 Entrega</h3>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-blue-600 text-xl mt-0">📍</span>
                <p className="text-gray-700">{order.delivery_address}</p>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-lg mb-3">📋 Tu pedido</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-semibold">C$ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-red-600">C$ {order.total}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            <ChatBox />
            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${driver.phone}`}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
              >
                📞 Llamar al conductor
              </a>
            </div>
          </div>
        )}

        {/* Botón de acción */}
        <button className="w-full mt-4 bg-red-600 text-white py-3 rounded-full font-bold hover:bg-red-700 transition-colors">
          ✋ Recibir pedido
        </button>
      </main>
    </div>
  );
}
