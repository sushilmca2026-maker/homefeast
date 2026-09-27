import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'customer',
    phone: '', city: '', kitchenName: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await register(form);
      if (user.role === 'cook') navigate('/cook/dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Full Name" onChange={handleChange} required
          className="w-full border rounded-lg px-4 py-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          className="w-full border rounded-lg px-4 py-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
          className="w-full border rounded-lg px-4 py-2" />
        <input name="phone" placeholder="Phone" onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2" />
        <input name="city" placeholder="City" onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2" />
        <select name="role" onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2">
          <option value="customer">I want to order food</option>
          <option value="cook">I am a home cook</option>
        </select>
        {form.role === 'cook' && (
          <input name="kitchenName" placeholder="Kitchen Name" onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2" />
        )}
        <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700">
          Register
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Have an account? <Link to="/login" className="text-brand-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
