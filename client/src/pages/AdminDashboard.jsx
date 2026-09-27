import { useEffect, useState } from 'react';
import api from '../services/api';
export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [pending, setPending] = useState([]);
  const [users, setUsers] = useState([]);
  const load = () => {
    api.get('/admin/stats').then(({ data }) => setStats(data));
    api.get('/admin/cooks/pending').then(({ data }) => setPending(data));
    api.get('/admin/users').then(({ data }) => setUsers(data));
  };
  useEffect(load, []);
  const approve = async (id) => {
    await api.patch(`/admin/cooks/${id}/approve`);
    load();
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['users', 'cooks', 'orders', 'subscriptions'].map((k) => (
          <div key={k} className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-brand-600">{stats[k] || 0}</p>
            <p className="text-gray-600 capitalize">{k}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-3">Pending Cook Approvals</h2>
      {pending.length === 0 ? <p className="text-gray-500 mb-8">No pending approvals.</p> : (
        <div className="space-y-2 mb-8">
          {pending.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <span>{c.kitchenName} - {c.user?.email}</span>
              <button onClick={() => approve(c._id)}
                className="bg-green-600 text-white px-4 py-1 rounded text-sm">Approve</button>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-3">All Users</h2>
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {users.map((u) => (
          <div key={u._id} className="p-3 flex justify-between text-sm">
            <span>{u.name} ({u.email})</span>
            <span className="text-gray-500">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
