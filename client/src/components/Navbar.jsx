import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand-600">HomeFeast</Link>
        <div className="flex items-center gap-4">
          <Link to="/cooks" className="text-gray-700 hover:text-brand-600">Browse Cooks</Link>
          {user ? (
            <>
              {user.role === 'customer' && <Link to="/dashboard" className="text-gray-700 hover:text-brand-600">Dashboard</Link>}
              {user.role === 'cook' && <Link to="/cook/dashboard" className="text-gray-700 hover:text-brand-600">Cook Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin" className="text-gray-700 hover:text-brand-600">Admin</Link>}
              <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-brand-600">Login</Link>
              <Link to="/register" className="bg-brand-600 text-white px-4 py-1.5 rounded-lg hover:bg-brand-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
