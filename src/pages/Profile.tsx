import { useStore } from '../store/useStore';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, MapPin, Phone, Mail, Heart, Settings, HelpCircle, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Casa', address: 'De Rotonda Metrocentro 200m norte', default: true },
    { id: 2, label: 'Oficina', address: 'Barrio Los Robles, Managua', default: false },
  ]);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Header />
      <main className="p-4 pb-24">
        {/* Cabecera del perfil */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl mb-6 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
            👤
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-red-100">{user.email}</p>
        </div>

        {/* Información personal */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-bold text-lg mb-3">Información Personal</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Teléfono</p>
                <p className="font-medium">+505 8888-1234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direcciones guardadas */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Mis Direcciones</h2>
            <button className="text-red-600 text-sm font-medium">+ Agregar</button>
          </div>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-3 border-2 rounded-lg ${
                  addr.default ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-bold">{addr.label}</span>
                    {addr.default && (
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                        Predeterminada
                      </span>
                    )}
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">✏️</button>
                </div>
                <p className="text-sm text-gray-600">{addr.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Favoritos */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-2 mb-3 font-bold text-lg">
            <Heart className="w-5 h-5 text-red-600" />
            <span>Restaurantes Favoritos</span>
          </div>
          <p className="text-gray-600 text-sm mb-3">Aún no tienes favoritos guardados</p>
          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-red-600 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors"
          >
            Explorar restaurantes
          </button>
        </div>

        {/* Preferencias y ayuda */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-2">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Configuración</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Términos y Condiciones</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="font-medium">Centro de Ayuda</span>
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-600">24</p>
            <p className="text-xs text-gray-600">Pedidos</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-600">C$ 12,580</p>
            <p className="text-xs text-gray-600">Gastado</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-orange-600">4.6</p>
            <p className="text-xs text-gray-600">Promedio 🌟</p>
          </div>
        </div>

        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </main>
    </div>
  );
}
