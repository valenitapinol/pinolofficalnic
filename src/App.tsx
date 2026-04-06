import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Tracking from './pages/Tracking';
import DriverRegister from './pages/DriverRegister';
import DriverDashboard from './pages/DriverDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        {/* Landing e inicio */}
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />

        {/* Cliente */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tracking/:orderId" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />

        {/* Driver */}
        <Route path="/driver/register" element={<DriverRegister />} />
        <Route path="/driver/dashboard" element={<ProtectedRoute><DriverDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
