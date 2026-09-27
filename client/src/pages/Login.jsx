import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      if (user.role === 'cook') navigate('/cook/dashboard');
      else if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          className="w-full border rounded-lg px-4 py-2" />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          className="w-full border rounded-lg px-4 py-2" />
        <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700">
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        No account? <Link to="/register" className="text-brand-600 hover:underline">Register</Link>
      </p>
      <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <p className="font-semibold">Test accounts (after seeding):</p>
        <p>Admin: admin@homefeast.com / admin123</p>
        <p>Cook: ramesh@cook.com / cook123</p>
        <p>User: priya@user.com / user123</p>
      </div>
    </div>
  );
}
