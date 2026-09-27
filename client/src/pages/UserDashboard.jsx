import { useEffect, useState } from 'react';
import api from '../services/api';
export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    api.get('/orders/my').then(({ data }) => setOrders(data));
    api.get('/subscriptions/my').then(({ data }) => setSubs(data));
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <h2 className="text-xl font-semibold mb-3">My Orders</h2>
      {orders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
        <div className="space-y-2">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
              <span>{o.items?.[0]?.quantity}x item</span>
              <span className="text-gray-500">Rs {o.totalAmount}</span>
              <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-700">{o.status}</span>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mt-8 mb-3">My Subscriptions</h2>
      {subs.length === 0 ? <p className="text-gray-500">No subscriptions yet.</p> : (
        <div className="space-y-2">
          {subs.map((s) => (
            <div key={s._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between">
              <span>{s.plan} plan</span>
              <span className="text-gray-500">Rs {s.amount}</span>
              <span className="text-sm">{s.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
