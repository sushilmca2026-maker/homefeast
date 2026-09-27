import { useEffect, useState } from 'react';
import api from '../services/api';
export default function CookDashboard() {
  const [orders, setOrders] = useState([]);
  const [subs, setSubs] = useState([]);
  const [menu, setMenu] = useState({
    dishName: '', mealType: 'veg', cuisine: '', price: '', mealPlan: 'daily', deliveryTime: ''
  });
  const [message, setMessage] = useState('');
  const load = () => {
    api.get('/orders/cook').then(({ data }) => setOrders(data));
    api.get('/subscriptions/cook').then(({ data }) => setSubs(data));
  };
  useEffect(load, []);
  const addMenu = async (e) => {
    e.preventDefault();
    try {
      await api.post('/menus', menu);
      setMessage('Menu item added!');
      setMenu({ dishName: '', mealType: 'veg', cuisine: '', price: '', mealPlan: 'daily', deliveryTime: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed');
    }
  };
  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    load();
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Cook Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Menu Item</h2>
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
        <form onSubmit={addMenu} className="grid md:grid-cols-3 gap-3">
          <input placeholder="Dish name" value={menu.dishName}
            onChange={(e) => setMenu({ ...menu, dishName: e.target.value })} required
            className="border rounded-lg px-3 py-2" />
          <select value={menu.mealType}
            onChange={(e) => setMenu({ ...menu, mealType: e.target.value })}
            className="border rounded-lg px-3 py-2">
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <input placeholder="Cuisine" value={menu.cuisine}
            onChange={(e) => setMenu({ ...menu, cuisine: e.target.value })}
            className="border rounded-lg px-3 py-2" />
          <input type="number" placeholder="Price" value={menu.price}
            onChange={(e) => setMenu({ ...menu, price: e.target.value })} required
            className="border rounded-lg px-3 py-2" />
          <select value={menu.mealPlan}
            onChange={(e) => setMenu({ ...menu, mealPlan: e.target.value })}
            className="border rounded-lg px-3 py-2">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <input placeholder="Delivery time" value={menu.deliveryTime}
            onChange={(e) => setMenu({ ...menu, deliveryTime: e.target.value })}
            className="border rounded-lg px-3 py-2" />
          <button className="md:col-span-3 bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700">
            Add Menu
          </button>
        </form>
      </div>
      <h2 className="text-xl font-semibold mb-3">Incoming Orders</h2>
      {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
        <div className="space-y-2 mb-8">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <span>{o.user?.name}</span>
              <span>Rs {o.totalAmount}</span>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(o._id, 'accepted')}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm">Accept</button>
                <button onClick={() => updateStatus(o._id, 'rejected')}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm">Reject</button>
                <button onClick={() => updateStatus(o._id, 'delivered')}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Delivered</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-3">Subscriptions</h2>
      {subs.length === 0 ? <p className="text-gray-500">No subscriptions yet.</p> : (
        <div className="space-y-2">
          {subs.map((s) => (
            <div key={s._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
              <span>{s.user?.name}</span>
              <span>{s.plan} - Rs {s.amount}</span>
              <span className="text-sm">{s.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
