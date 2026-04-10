import { Link } from 'react-router-dom';
import { ArrowRight, Zap, MapPin, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="PinolApp" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-red-600">PinolApp</h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#features" className="text-gray-600 hover:text-red-600">Características</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-red-600">Cómo funciona</a>
            <a href="#pricing" className="text-gray-600 hover:text-red-600">Precios</a>
            <Link to="/login" className="text-red-600 font-medium">Iniciar sesión</Link>
            <Link to="/register" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">Registrarse</Link>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Comida Nicaragüense Entregada Rápido</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">La mejor comida típica de Nicaragua directamente a tu puerta. Rápido, confiable y delicioso.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 flex items-center gap-2">Descargar App <ArrowRight className="w-5 h-5" /></Link>
            <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-red-600">Ver restaurantes</button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-4xl font-bold text-red-600">1,200+</h3><p className="text-gray-600">Pedidos diarios</p></div>
          <div><h3 className="text-4xl font-bold text-red-600">45+</h3><p className="text-gray-600">Restaurantes asociados</p></div>
          <div><h3 className="text-4xl font-bold text-red-600">25 min</h3><p className="text-gray-600">Entrega promedio</p></div>
          <div><h3 className="text-4xl font-bold text-red-600">4.8★</h3><p className="text-gray-600">Calificación</p></div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegir PinolApp?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-12 h-12 text-red-600" />, title: 'Súper Rápido', desc: 'Entrega en 25-40 minutos a toda Managua' },
              { icon: <DollarSign className="w-12 h-12 text-red-600" />, title: 'Mejores Precios', desc: 'Ofertas exclusivas y combos especiales' },
              { icon: <Users className="w-12 h-12 text-red-600" />, title: 'Conductores Verificados', desc: 'Conductores confiables y profesionales' },
              { icon: <MapPin className="w-12 h-12 text-red-600" />, title: 'Rastreo en Vivo', desc: 'Sigue tu pedido en tiempo real' },
              { icon: <TrendingUp className="w-12 h-12 text-red-600" />, title: 'Múltiples Pagos', desc: 'Efectivo, tarjetas y transferencias banco' },
              { icon: <ArrowRight className="w-12 h-12 text-red-600" />, title: 'Chat en Vivo', desc: 'Comunicate directamente con tu conductor' },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Descarga', desc: 'Descarga PinolApp en tu celular' },
              { num: 2, title: 'Registrate', desc: 'Crea tu cuenta en segundos' },
              { num: 3, title: 'Ordena', desc: 'Elige tu restaurante y comida' },
              { num: 4, title: 'Recibe', desc: 'Tu pedido llega fresco a tu casa' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{step.num}</div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Eres conductor?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Únete a nuestra red de más de 500 conductores. Gana dinero trabajando con tu propio horario.</p>
          <Link to="/driver/register" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 inline-flex items-center gap-2">Registrarse como Conductor <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Hablamos con tu restaurante?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Llega a más clientes, aumenta tus ventas 30% en promedio.</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700">Contactar ventas</button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div><h4 className="font-bold mb-4">PinolApp</h4><p className="text-gray-400 text-sm">La mejor comida nicaragüense a tu puerta</p></div>
            <div><h4 className="font-bold mb-4">Empresa</h4><ul className="text-gray-400 text-sm space-y-2"><li><a href="#" className="hover:text-white">Sobre nosotros</a></li><li><a href="#" className="hover:text-white">Contacto</a></li><li><a href="#" className="hover:text-white">Carreras</a></li></ul></div>
            <div><h4 className="font-bold mb-4">Legal</h4><ul className="text-gray-400 text-sm space-y-2"><li><a href="#" className="hover:text-white">Privacidad</a></li><li><a href="#" className="hover:text-white">Términos</a></li></ul></div>
            <div><h4 className="font-bold mb-4">Seguínos</h4><ul className="text-gray-400 text-sm space-y-2"><li><a href="#" className="hover:text-white">Facebook</a></li><li><a href="#" className="hover:text-white">Instagram</a></li><li><a href="#" className="hover:text-white">Twitter</a></li></ul></div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400"><p>&copy; 2026 PinolApp. Todos los derechos reservados.</p></div>
        </div>
      </footer>
    </div>
  );
}
