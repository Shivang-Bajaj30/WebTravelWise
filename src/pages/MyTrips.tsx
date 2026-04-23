import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MyTrips = () => {
  const navigate = useNavigate();

  // Demo trip data (replace with real data when available)
  const trips = [
    {
      id: 't1',
      title: 'TESTING 1',
      dates: 'Oct 10 - Oct 13',
      image: '/images/bg2.jpg',
      summary: 'Romantic getaway exploring museums, cafes and the Eiffel Tower.',
      price: '$420'
    },
    {
      id: 't2',
      title: 'TESTING 2',
      dates: 'Nov 1 - Nov 7',
      image: '/images/mountains.jpg',
      summary: 'A week-long trek with stunning mountain scenery and local culture.',
      price: '$850'
    }
  ];

  const loading = false;
  const error: string | null = null;

  const handleCreateTrip = () => {
    navigate('/trip-details');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading your trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
        <p className="text-red-600 dark:text-red-400 mb-4">Failed to load your trips. Please try again later.</p>
        <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl px-6 py-3 text-white font-bold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-8 max-w-6xl mx-auto min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">My Trips</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and review your planned trips</p>
        </div>
        <button
          onClick={handleCreateTrip}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full px-6 py-2.5 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/40 transition-all duration-300 text-sm hover:scale-105"
        >
          + Create New Trip
        </button>
      </motion.div>

      {trips.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl bg-gray-50/50 dark:bg-gray-800/30"
        >
          <div className="text-6xl mb-6">🧳</div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trips yet</p>
          <p className="mb-6 text-gray-500 dark:text-gray-400 text-center max-w-md">
            You haven't planned any trips yet. Start by creating a new itinerary.
          </p>
          <button
            onClick={handleCreateTrip}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl px-8 py-3 text-white font-bold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            Plan your first trip ✨
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white dark:bg-gray-800/60 rounded-3xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-48 w-full relative overflow-hidden">
                <img src={trip.image} alt={trip.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{trip.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {trip.dates} · <span className="font-semibold text-indigo-600 dark:text-indigo-400">{trip.price}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm leading-relaxed">{trip.summary}</p>
                <div className="mt-5 flex items-center justify-between">
                  <button className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    View Details →
                  </button>
                  <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-md text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all">
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;