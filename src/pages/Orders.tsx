import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { Clock, MapPin, CheckCircle, Truck } from 'lucide-react';

interface Order {
  id: string;
  restaurant: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'on_way' | 'delivered' | 'cancelled';
  date: string;
  items_count: number;
  delivery_address: string;
  estimated_time: number;
}

const mockOrders: Order[] = [
  {
    id: '12345',
    restaurant: 'El Patio - Comida Típica',
    total: 1250,
    status: 'on_way',
    date: '2026-04-06T14:32:00',
    items_count: 3,
    delivery_address: 'De Rotonda Metrocentro 200m norte',
    estimated_time: 18,
  },
  {
    id: '12344',
    restaurant: 'Pizza Italiana',
    total: 2800,
    status: 'delivered',
    date: '2026-04-05T19:15:00',
    items_count: 2,
    delivery_address: 'Barrio Los Robles',
    estimated_time: 0,
  },
  {
    id: '12343',
    restaurant: 'Pupusas Express',
    total: 850,
    status: 'delivered',
    date: '2026-04-03T12:45:00',
    items_count: 4,
    delivery_address: 'Barrio Jalteva',
    estimated_time: 0,
  },
];

const statusConfig = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
  preparing: { label: 'Preparando', color: 'bg-blue-100 text-blue-800', icon: '👨‍🍳' },
  ready: { label: 'Listo', color: 'bg-green-100 text-green-800', icon: '✅' },
  on_way: { label: 'En camino', color: 'bg-purple-100 text-purple-800', icon: '🚗' },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: '📦' },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: '❌' },
};

export default function Orders() {
  const { user } = useStore();
  const [orders] = useState<Order[]>(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredOrders = selectedStatus
    ? orders.filter((o) => o.status === selectedStatus)
    : orders;

  if (!user) {
    return (
      <div>
        <Header />
        <main className="p-4 text-center">
          <p className="text-gray-600 mb-4">Inicia sesión para ver tus pedidos</p>
          <Link to="/login" className="bg-red-600 text-white px-6 py-2 rounded-full inline-block">
            Iniciar sesión
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="p-4 pb-24">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
          <Link to="/" className="text-red-600 font-medium">
            + Nuevo
          </Link>
        </div>

        {/* Filtros por estado */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedStatus === null
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedStatus(key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedStatus === key ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {config.icon} {config.label}
            </button>
          ))}
        </div>

        {/* Lista de pedidos */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No hay pedidos en este estado</p>
            <Link to="/" className="text-red-600 font-medium">
              Ordenar ahora
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status];
              return (
                <Link
                  to={order.status === 'on_way' ? `/tracking/${order.id}` : '#'}
                  key={order.id}
                  className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-white"
                >
                  {/* Header del pedido */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                      <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
                      {config.icon} {config.label}
                    </div>
                  </div>

                  {/* Detalles del pedido */}
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(order.date).toLocaleDateString('es-NI')} -{' '}
                        {new Date(order.date).toLocaleTimeString('es-NI', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{order.delivery_address}</span>
                    </div>
                    {order.status === 'on_way' && (
                      <div className="flex items-center gap-2 text-purple-600 font-medium">
                        <Truck className="w-4 h-4" />
                        <span>~{order.estimated_time} minutos de llegada</span>
                      </div>
                    )}
                  </div>

                  {/* Footer del pedido */}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div>
                      <p className="text-xs text-gray-500">{order.items_count} artículos</p>
                      <p className="font-bold text-lg text-red-600">C$ {order.total}</p>
                    </div>
                    {order.status === 'on_way' && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Detalles</p>
                        <p className="text-red-600 font-semibold">→</p>
                      </div>
                    )}
                    {order.status === 'delivered' && (
                      <button className="text-sm bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors">
                        Reordenar
                      </button>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
