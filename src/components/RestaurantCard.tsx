interface RestaurantCardProps {
  name: string;
  rating: number;
  time: number;
  price: number;
}

export default function RestaurantCard({ name, rating, time, price }: RestaurantCardProps) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <div className="border rounded-xl p-3 shadow-sm">
      <h3 className="font-bold text-lg">{name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-yellow-500">
          {'★'.repeat(fullStars)}{'☆'.repeat(emptyStars)}
        </span>
        <span className="text-gray-500 text-sm">{time} min</span>
      </div>
      <p className="text-green-700 font-semibold">${price}</p>
    </div>
  );
}
