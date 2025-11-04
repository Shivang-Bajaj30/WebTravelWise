const MyTrips = () => {
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
    // Replace with actual navigation to trip creation flow
    window.location.href = '/trip-details';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p>Loading your trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="text-red-600">Failed to load your trips. Please try again later.</p>
        <button onClick={() => window.location.reload()} className="bg-red-700 rounded px-6 py-3 mt-2 text-white font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">My Trips</h1>
        <button onClick={handleCreateTrip} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full px-5 py-2 text-white font-semibold shadow">+ Create New Trip</button>
      </div>

      {trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-200 rounded-xl">
          <img src="/images/empty_trips.svg" alt="No trips" className="w-48 h-48 mb-4 opacity-90" />
          <p className="text-2xl font-bold mb-2">No trips yet</p>
          <p className="mb-4 text-gray-600">You haven't planned any trips yet. Start by creating a new itinerary.</p>
          <button onClick={handleCreateTrip} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded px-6 py-3 text-white font-bold">Plan your first trip</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition">
              <div className="h-44 w-full relative">
                <img src={trip.image} alt={trip.title} className="object-cover w-full h-full" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{trip.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{trip.dates} · <span className="font-semibold text-gray-700">{trip.price}</span></p>
                <p className="text-gray-600 mt-3 text-sm">{trip.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button className="text-orange-600 font-semibold">View</button>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow">Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips; 