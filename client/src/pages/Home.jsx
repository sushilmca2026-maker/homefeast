import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900">
            Fresh Homemade Meals, <span className="text-brand-600">Delivered Daily</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Subscribe to healthy, hygienic tiffin services from verified home cooks near you.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/cooks" className="bg-brand-600 text-white px-6 py-3 rounded-lg hover:bg-brand-700">
              Browse Cooks
            </Link>
            <Link to="/register" className="bg-white border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50">
              Become a Cook
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">Verified Home Cooks</h3>
          <p className="text-gray-600 mt-2">All cooks are admin-approved for quality and hygiene.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">Flexible Plans</h3>
          <p className="text-gray-600 mt-2">Daily, weekly, or monthly subscriptions - your choice.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800">Fresh & Affordable</h3>
          <p className="text-gray-600 mt-2">Home-style meals at prices cheaper than restaurants.</p>
        </div>
      </section>
    </div>
  );
}
