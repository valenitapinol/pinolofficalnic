import { useEffect, useState } from 'react';
import { Navigation } from 'lucide-react';

interface DriverMapProps {
  driverName: string;
  driverRating: number;
  driverPhone: string;
}

export default function DriverMap({ driverName, driverRating, driverPhone }: DriverMapProps) {
  const [driverLocation, setDriverLocation] = useState({ x: 30, y: 30 });
  const [deliveryLocation] = useState({ x: 85, y: 85 });

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation((prev) => ({
        x: Math.min(prev.x + Math.random() * 5, 85),
        y: Math.min(prev.y + Math.random() * 5, 85),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const distance = Math.sqrt(
    Math.pow(deliveryLocation.x - driverLocation.x, 2) +
    Math.pow(deliveryLocation.y - driverLocation.y, 2)
  );
  const estimatedTime = Math.ceil(distance / 10);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
      {/* Mapa interactivo */}
      <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl mb-4 border-2 border-blue-200 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Línea de ruta */}
          <line
            x1={driverLocation.x}
            y1={driverLocation.y}
            x2={deliveryLocation.x}
            y2={deliveryLocation.y}
            stroke="#dc2626"
            strokeWidth="0.5"
            strokeDasharray="2"
          />

          {/* Ubicación del driver (icono rojo) */}
          <circle cx={driverLocation.x} cy={driverLocation.y} r="2" fill="#dc2626" />
          <circle cx={driverLocation.x} cy={driverLocation.y} r="3.5" fill="none" stroke="#dc2626" strokeWidth="0.5" />

          {/* Ubicación de entrega (icono azul) */}
          <rect x={deliveryLocation.x - 1.5} y={deliveryLocation.y - 1.5} width="3" height="3" fill="#2563eb" />
        </svg>

        {/* Leyenda */}
        <div className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow-sm">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span>Driver en ruta</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-600"></div>
            <span>Tu ubicación</span>
          </div>
        </div>

        {/* Botón de actualizaciones */}
        <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded shadow-sm text-xs">
          <Navigation className="w-3 h-3 text-green-600 inline mr-1" />
          <span>En vivo</span>
        </div>
      </div>

      {/* Info del driver */}
      <div className="border-t pt-3">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-lg">
            👨‍💼
          </div>
          <div>
            <p>{driverName}</p>
            <p className="text-xs text-yellow-600 font-semibold">⭐ {driverRating.toFixed(1)}</p>
          </div>
        </h3>

        <div className="bg-green-50 p-3 rounded-lg mb-3">
          <p className="text-sm text-gray-600">Tiempo estimado de llegada</p>
          <p className="text-2xl font-bold text-green-600">~{estimatedTime} min</p>
          <p className="text-xs text-gray-500 mt-1">{distance.toFixed(1)} km de distancia</p>
        </div>

        <div className="flex gap-2">
          <a href={`tel:${driverPhone}`} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center text-sm font-medium hover:bg-green-700 transition-colors">
            📞 Llamar
          </a>
          <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            💬 Chat
          </button>
        </div>
      </div>
    </div>
  );
}
