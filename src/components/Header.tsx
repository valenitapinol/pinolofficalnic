import { User, Search } from 'lucide-react';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Header() {
  const user = useStore((state) => state.user);
  return (
    <header className="bg-red-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">PinolApp</Link>
      <div className="flex gap-4 items-center">
        <Search className="w-5 h-5" />
        <CartIcon />
        <Link to={user ? "/profile" : "/login"}>
          <User className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
