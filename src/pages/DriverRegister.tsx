import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FileText, DollarSign, CheckCircle } from 'lucide-react';

export default function DriverRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    idNumber: '',
    vehicle: 'motorcycle',
    plate: '',
    bankAccount: '',
    bankName: 'BAC',
    acceptTerms: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!formData.acceptTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    toast.success('✅ Solicitud enviada. Te contactaremos en 24 horas');
    setTimeout(() => {
      navigate('/driver/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Sé Conductor PinolApp</h1>
          <p className="text-gray-600">Gana dinero con tu propio horario</p>
        </div>

        {/* Progreso */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                s <= step ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Información Personal</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="+505 8888-1234"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="juan@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Número de Cédula
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="123-456789-0001A"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Información del Vehículo</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Vehículo
                </label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="motorcycle">Moto</option>
                  <option value="bicycle">Bicicleta</option>
                  <option value="car">Carro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Placa del Vehículo
                </label>
                <input
                  type="text"
                  name="plate"
                  value={formData.plate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="NM-12345"
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Requisitos:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Vehículo en buen estado</li>
                  <li>✓ Licencia de conducir vigente</li>
                  <li>✓ Documento de propiedad del vehículo</li>
                  <li>✓ Seguro del vehículo</li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Información de Pagos</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Banco
                </label>
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="BAC">BAC Credomatic</option>
                  <option value="Banpro">Banpro</option>
                  <option value="Banco America Central">Banco América Central</option>
                  <option value="Avanza">Banco Avanza</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ej: 1234567890123"
                  required
                />
              </div>

              <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Información de Pagos
                </h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Recibe tu 80% de las ganancias</li>
                  <li>• Pagos semanales automáticos</li>
                  <li>• Sin comisión por retiro</li>
                  <li>• Disponible también efectivo en oficina</li>
                </ul>
              </div>

              <label className="flex items-start gap-3 cursor-pointer mt-6">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">
                  Acepto los términos y condiciones de PinolApp y confirmo que la información
                  proporcionada es correcta.
                </span>
              </label>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Atrás
              </button>
            )}
            <button
              type="submit"
              className={`flex-1 py-3 rounded-lg font-bold text-white transition-colors ${
                step === 3 && !formData.acceptTerms
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {step === 3 ? '✅ Enviar Solicitud' : 'Siguiente'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600">
          ¿Ya eres conductor?{' '}
          <a href="/driver/login" className="text-blue-600 font-medium hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
