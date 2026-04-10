import { User, Search, MapPin } from 'lucide-react';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Header() {
  const user = useStore((state) => state.user);
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/images/delivery.png" alt="PinolApp" className="h-10 w-auto" />
          <div>
            <div className="text-xl font-bold">PinolApp</div>
            <p className="text-xs text-red-100">Delivery Nicaragua</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Search className="w-5 h-5 cursor-pointer hover:text-red-200" />
          <CartIcon />
          <Link to={user ? "/profile" : "/login"}>
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="mt-3 flex items-center text-sm text-red-100">
        <MapPin className="w-4 h-4 mr-1" />
        <span>Managua, Nicaragua</span>
      </div>
    </header>
  );
}
