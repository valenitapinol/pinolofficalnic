interface MenuItemProps {
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
}

export default function MenuItem({ title, description, oldPrice, price }: MenuItemProps) {
  return (
    <div className="border rounded-xl p-3">
      <h4 className="font-bold">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="flex gap-2 mt-1">
        {oldPrice && <span className="line-through text-gray-400">${oldPrice}</span>}
        <span className="text-red-600 font-bold">${price}</span>
      </div>
    </div>
  );
}
