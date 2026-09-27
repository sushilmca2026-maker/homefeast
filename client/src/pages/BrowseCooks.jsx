import { useEffect, useState } from 'react';
import api from '../services/api';
import CookCard from '../components/CookCard';
export default function BrowseCooks() {
  const [cooks, setCooks] = useState([]);
  const [filters, setFilters] = useState({ cuisine: '', city: '' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/cooks', { params: filters })
      .then(({ data }) => setCooks(data))
      .finally(() => setLoading(false));
  }, [filters]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Browse Home Cooks</h1>
      <div className="flex flex-wrap gap-3 mb-6">
        <input placeholder="Cuisine (e.g. Punjabi)"
          value={filters.cuisine}
          onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
          className="border rounded-lg px-4 py-2" />
        <input placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="border rounded-lg px-4 py-2" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : cooks.length === 0 ? (
        <p className="text-gray-500">No cooks found. Try running the seed script in server.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooks.map((c) => <CookCard key={c._id} cook={c} />)}
        </div>
      )}
    </div>
  );
}
