import { Clock, Star, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  id: number;
  name: string;
  rating: number;
  time: number;
  price: number;
  category?: string;
}

export default function RestaurantCard({ name, rating, time, price, category }: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          {category && (
            <p className="text-sm text-red-600 font-medium">{category}</p>
          )}
        </div>
        <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
          <span className="text-sm font-medium text-green-700">{rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{time} min</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Envío gratis</span>
        </div>
        <div className="font-medium text-gray-800">
          C${price}
        </div>
      </div>
    </div>
  );
}
