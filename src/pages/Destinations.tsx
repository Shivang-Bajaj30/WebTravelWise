const Destinations = () => {
  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      description: "The City of Light awaits with its iconic landmarks, world-class museums, and romantic atmosphere.",
      image: "/images/paris.png",
      price: "From $1,299",
      duration: "7 days",
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"]
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      description: "Experience the perfect blend of ancient traditions and cutting-edge technology in Japan's capital.",
      image: "/images/Japan.png",
      price: "From $1,599",
      duration: "10 days",
      highlights: ["Mount Fuji", "Shibuya Crossing", "Traditional Temples"]
    },
    {
      id: 3,
      name: "Santorini, Greece",
      description: "Discover stunning sunsets, white-washed buildings, and crystal-clear waters in this Greek paradise.",
      image: "/images/Greece.png",
      price: "From $999",
      duration: "5 days",
      highlights: ["Oia Village", "Blue Dome Churches", "Wine Tasting"]
    },
    {
      id: 4,
      name: "Bali, Indonesia",
      description: "Immerse yourself in tropical beauty, ancient temples, and vibrant culture on the Island of Gods.",
      image: "/images/bali.jpg",
      price: "From $899",
      duration: "8 days",
      highlights: ["Rice Terraces", "Beach Resorts", "Hindu Temples"]
    },
    {
      id: 5,
      name: "New York City, USA",
      description: "The city that never sleeps offers endless entertainment, world-famous landmarks, and diverse culture.",
      image: "/images/nyc.jpg",
      price: "From $1,199",
      duration: "6 days",
      highlights: ["Times Square", "Central Park", "Broadway Shows"]
    },
    {
      id: 6,
      name: "Dubai, UAE",
      description: "Experience luxury and innovation in this modern desert metropolis with stunning architecture.",
      image: "/images/dubai.jpg",
      price: "From $1,399",
      duration: "7 days",
      highlights: ["Burj Khalifa", "Desert Safari", "Luxury Shopping"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Explore Our Destinations</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            Discover amazing destinations around the world. From bustling cities to serene beaches, find your perfect getaway.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundImage: `url(${destination.image})`,
                    backgroundColor: '#e5e7eb' // fallback color
                  }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {destination.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <span className="text-lg font-semibold text-blue-600">{destination.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors duration-200">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                    Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;