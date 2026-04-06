import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, password);
    if (success) {
      toast.success('Registro exitoso');
      navigate('/');
    } else {
      toast.error('Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">Registro</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-3" required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded mb-4" required />
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-full">Registrarse</button>
        </form>
        <p className="text-center mt-4">¿Ya tienes cuenta? <Link to="/login" className="text-red-600">Inicia sesión</Link></p>
      </div>
    </div>
  );
}
