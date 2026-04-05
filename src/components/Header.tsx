import { User, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-red-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PinolApp</h1>
      <div className="flex gap-3">
        <Search className="w-6 h-6" />
        <User className="w-6 h-6" />
      </div>
    </header>
  );
}
