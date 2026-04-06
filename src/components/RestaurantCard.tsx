interface RestaurantCardProps {
  name: string;
  rating: number;
  time: number;
  price: number;
  image?: string;
}

export default function RestaurantCard({ name, rating, time, price }: RestaurantCardProps) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className="flex items-center gap-4 border-b border-gray-100 pb-3 mb-3">
      <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
        🍽️
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">
            {'★'.repeat(fullStars)}{'☆'.repeat(emptyStars)}
          </span>
          <span className="text-gray-500">{time} min</span>
        </div>
        <p className="text-green-700 font-semibold">C$ {price}</p>
      </div>
    </div>
  );
}
