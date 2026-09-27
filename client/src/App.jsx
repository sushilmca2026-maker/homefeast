import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BrowseCooks from './pages/BrowseCooks';
import CookProfile from './pages/CookProfile';
import UserDashboard from './pages/UserDashboard';
import CookDashboard from './pages/CookDashboard';
import AdminDashboard from './pages/AdminDashboard';
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cooks" element={<BrowseCooks />} />
          <Route path="/cooks/:id" element={<CookProfile />} />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['customer']}><UserDashboard /></ProtectedRoute>
          } />
          <Route path="/cook/dashboard" element={
            <ProtectedRoute roles={['cook']}><CookDashboard /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
