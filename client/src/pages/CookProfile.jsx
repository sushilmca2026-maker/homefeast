import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
export default function CookProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [cook, setCook] = useState(null);
  const [menus, setMenus] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    api.get(`/cooks/${id}`).then(({ data }) => setCook(data));
    api.get(`/menus/cook/${id}`).then(({ data }) => setMenus(data));
  }, [id]);
  const order = async (menu) => {
    if (!user) return setMessage('Please login first.');
    try {
      await api.post('/orders', {
        cook: cook._id,
        items: [{ menu: menu._id, quantity: 1, price: menu.price }],
        totalAmount: menu.price,
        deliveryAddress: 'Default address'
      });
      setMessage('Order placed! Waiting for cook approval.');
    } catch (err) {
      setMessage('Failed to place order.');
    }
  };
  if (!cook) return <p className="p-10">Loading...</p>;
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold">{cook.kitchenName}</h1>
        <p className="text-gray-600 mt-2">By {cook.user?.name} - {cook.user?.city}</p>
        <p className="mt-3">{cook.description}</p>
        <p className="mt-2 text-sm">Rating: {cook.rating || 'New'} ({cook.totalReviews} reviews)</p>
        <p className="text-sm">Cuisine: {cook.cuisine?.join(', ')}</p>
        <p className="text-sm">Delivery: {cook.deliveryTimings?.morning} / {cook.deliveryTimings?.evening}</p>
      </div>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Menu</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {menus.map((m) => (
          <div key={m._id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{m.dishName}</h3>
              <p className="text-sm text-gray-500">{m.mealType} - {m.cuisine} - {m.mealPlan}</p>
              <p className="text-brand-600 font-bold mt-1">Rs {m.price}</p>
            </div>
            <button onClick={() => order(m)}
              className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700">
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
