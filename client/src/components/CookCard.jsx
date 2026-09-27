import { Link } from 'react-router-dom';
export default function CookCard({ cook }) {
  return (
    <Link to={`/cooks/${cook._id}`} className="block bg-white rounded-xl shadow hover:shadow-lg transition p-5">
      <h3 className="text-lg font-semibold text-gray-800">{cook.kitchenName}</h3>
      <p className="text-sm text-gray-500 mt-1">{cook.user?.name} - {cook.user?.city}</p>
      <p className="text-sm text-gray-600 mt-2">{cook.description}</p>
      <div className="flex items-center gap-2 mt-3 text-sm">
        <span className="text-yellow-500">Rating: {cook.rating || 'New'}</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">{cook.cuisine?.join(', ')}</span>
      </div>
    </Link>
  );
}
