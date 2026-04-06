import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('Sesión iniciada');
      navigate('/');
    } else {
      toast.error('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">PinolApp</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded mb-4" required />
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-full">Iniciar sesión</button>
        </form>
        <p className="text-center mt-4">¿No tienes cuenta? <Link to="/register" className="text-red-600">Regístrate</Link></p>
      </div>
    </div>
  );
}
