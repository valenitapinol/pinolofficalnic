interface MenuItemProps {
  title: string;
  description: string;
  oldPrice?: number;
  price: number;
}

export default function MenuItem({ title, description, oldPrice, price }: MenuItemProps) {
  return (
    <div className="border rounded-xl p-3 mb-3 shadow-sm bg-white">
      <h4 className="font-bold">{title}</h4>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex items-center gap-2 mt-1">
        {oldPrice && <span className="line-through text-gray-400 text-sm">C$ {oldPrice}</span>}
        <span className="text-red-600 font-bold text-lg">C$ {price}</span>
      </div>
    </div>
  );
}
