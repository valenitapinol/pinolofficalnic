import { useState } from 'react';
import { Clock, AlertCircle, LogOut, DollarSign, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface DeliveryOrder {
  id: string;
  customer: string;
  address: string;
  amount: number;
  status: 'pending' | 'accepted' | 'picked' | 'delivered';
  restaurant: string;
}

const mockOrders: DeliveryOrder[] = [
  {
    id: '12345',
    customer: 'María G.',
    address: 'De Rotonda Metrocentro 200m norte',
    amount: 350,
    status: 'pending',
    restaurant: 'El Patio - Comida Típica',
  },
  {
    id: '12346',
    customer: 'Carlos M.',
    address: 'Barrio Los Robles',
    amount: 420,
    status: 'pending',
    restaurant: 'Pupusas Express',
  },
  {
    id: '12347',
    customer: 'Andrea R.',
    address: 'Centro Comercial Managua',
    amount: 280,
    status: 'accepted',
    restaurant: 'Pizza Italiana',
  },
];

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [earnings, setEarnings] = useState(2450);
  const [totalDeliveries, setTotalDeliveries] = useState(187);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: 'accepted' as const } : o
      )
    );
    toast.success('✅ Pedido aceptado');
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    setEarnings(earnings + 150);
    setTotalDeliveries(totalDeliveries + 1);
    toast.success('✅ Entrega completada');
  };

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? 'Fuera de línea' : '✅ Conectado y aceptando pedidos');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">PinolApp Driver</h1>
            <p className="text-sm text-gray-600">Joel M. • ⭐ 4.8 (234 entregas)</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleOnline}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                isOnline
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {isOnline ? '🟢 En línea' : '🔴 Fuera de línea'}
            </button>
            <button className="text-gray-600 hover:text-red-600 p-2">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Dinero hoy</p>
                <p className="text-3xl font-bold text-green-600">C$ {earnings}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Entregas totales</p>
                <p className="text-3xl font-bold text-blue-600">{totalDeliveries}</p>
              </div>
              <MapPin className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pedidos pendientes</p>
                <p className="text-3xl font-bold text-orange-600">{orders.length}</p>
              </div>
              <Clock className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Calificación</p>
                <p className="text-3xl font-bold text-yellow-600">4.8 ⭐</p>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Alert */}
        {!isOnline && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <p className="text-yellow-800">
              🔴 Estás fuera de línea. Activa el botón para recibir pedidos.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mapa y órdenes activas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">📍 Mapa en Vivo</h2>
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-5xl mb-2">🗺️</div>
                  <p className="text-gray-600">Mapa integrado con rutas</p>
                  <p className="text-sm text-gray-500">Hazlo visible cuando hagas entregas</p>
                </div>
              </div>
            </div>

            {/* Órdenes disponibles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">📦 Pedidos Disponibles</h2>

              {orders.length === 0 && !isOnline ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No hay pedidos disponibles</p>
                  <p className="text-sm text-gray-500">Conéctate para recibir nuevos pedidos</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">¡Felicitaciones!</p>
                  <p className="text-sm text-gray-500">Completaste todos tus pedidos. Nuevo pedido en 30s...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold"># {order.id}</h3>
                          <p className="text-sm text-gray-600">De: {order.restaurant}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">C$ {order.amount}</p>
                          <p className="text-xs text-gray-600">Tu comisión: 80%</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded mb-3">
                        <p className="text-sm flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {order.address}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Cliente: {order.customer}</p>
                      </div>

                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          ✓ Aceptar Entrega
                        </button>
                      )}
                      {order.status === 'accepted' && (
                        <div className="space-y-2">
                          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            🚗 Estoy en camino
                          </button>
                          <button className="w-full border-2 border-orange-600 text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-50">
                            📞 Llamar al cliente
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Panel derecha */}
          <div className="space-y-6">
            {/* Detalles del pedido seleccionado */}
            {selectedOrder && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Detalles del Pedido</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Pedido</p>
                    <p className="font-bold">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Restaurante</p>
                    <p className="font-bold">{selectedOrder.restaurant}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cliente</p>
                    <p className="font-bold">{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dirección</p>
                    <p className="font-bold">{selectedOrder.address}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-gray-600">Tu ganancia (80%)</p>
                    <p className="text-2xl font-bold text-green-600">
                      C$ {Math.round(selectedOrder.amount * 0.8)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCompleteOrder(selectedOrder.id)}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                  ✓ Marcar como Entregado
                </button>
              </div>
            )}

            {/* Info de seguridad */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-blue-900 mb-3">💡 Consejos de Seguridad</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>✓ Verifica al cliente antes de entregar</li>
                <li>✓ Toma foto del pedido entregado</li>
                <li>✓ Usa casco siempre</li>
                <li>✓ Respeta los límites de velocidad</li>
              </ul>
            </div>

            {/* Resumen semanal */}
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="font-bold text-green-900 mb-3">📊 Esta Semana</h3>
              <div className="text-sm text-green-800 space-y-2">
                <p>Entregas: 23</p>
                <p>Ingresos: C$ 4,230</p>
                <p>Promedio por entrega: C$ 184</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
