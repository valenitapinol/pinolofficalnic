import { User, Search, MapPin } from 'lucide-react';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import logo from '../assets/logo.svg';

export default function Header() {
  const user = useStore((state) => state.user);
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="PinolApp Logo" className="w-10 h-10 mr-2" />
            <div>
              <h1 className="text-xl font-bold">PinolApp</h1>
              <p className="text-xs text-red-100">Delivery Nicaragüense</p>
            </div>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <Search className="w-5 h-5 cursor-pointer hover:text-red-200 transition-colors" />
          <CartIcon />
          <Link to={user ? "/profile" : "/login"} className="hover:text-red-200 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Location bar */}
      <div className="mt-3 flex items-center text-sm text-red-100 bg-red-500 bg-opacity-30 rounded-full px-3 py-1">
        <MapPin className="w-4 h-4 mr-1" />
        <span>Managua, Nicaragua</span>
      </div>
    </header>
  );
}
