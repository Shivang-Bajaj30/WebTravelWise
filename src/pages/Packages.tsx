const Packages = () => {
  const packages = [
    {
      id: 1,
      name: "European Grand Tour",
      description: "Experience the best of Europe with visits to Paris, Rome, Barcelona, and Amsterdam. Perfect for first-time visitors.",
      image: "/images/europe-tour.jpg",
      price: "From $2,499",
      duration: "14 days",
      destinations: ["Paris", "Rome", "Barcelona", "Amsterdam"],
      includes: ["Flights", "Hotels", "Guided Tours", "Breakfast"],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: "Asian Adventure",
      description: "Discover the wonders of Asia with stops in Tokyo, Bangkok, Singapore, and Bali. Culture, cuisine, and adventure await.",
      image: "/images/asia-tour.jpg",
      price: "From $1,899",
      duration: "12 days",
      destinations: ["Tokyo", "Bangkok", "Singapore", "Bali"],
      includes: ["Flights", "Hotels", "Local Transport", "Some Meals"],
      rating: 4.7,
      reviews: 203
    },
    {
      id: 3,
      name: "Mediterranean Cruise",
      description: "Sail through the Mediterranean with stops at beautiful coastal cities. Luxury and relaxation combined.",
      image: "/images/mediterranean-cruise.jpg",
      price: "From $1,699",
      duration: "10 days",
      destinations: ["Barcelona", "Nice", "Rome", "Santorini"],
      includes: ["Cruise Ship", "All Meals", "Entertainment", "Shore Excursions"],
      rating: 4.9,
      reviews: 89
    },
    {
      id: 4,
      name: "Safari & Beach Combo",
      description: "Experience the best of Africa with a Kenyan safari followed by relaxation on Zanzibar's pristine beaches.",
      image: "/images/safari-beach.jpg",
      price: "From $3,299",
      duration: "11 days",
      destinations: ["Nairobi", "Masai Mara", "Zanzibar"],
      includes: ["Flights", "Safari Lodge", "Beach Resort", "Game Drives"],
      rating: 4.9,
      reviews: 67
    },
    {
      id: 5,
      name: "South American Explorer",
      description: "Journey through South America visiting Peru, Chile, and Argentina. Ancient ruins, wine country, and vibrant cities.",
      image: "/images/south-america.jpg",
      price: "From $2,799",
      duration: "16 days",
      destinations: ["Lima", "Cusco", "Santiago", "Buenos Aires"],
      includes: ["Flights", "Hotels", "Machu Picchu Tour", "Wine Tasting"],
      rating: 4.6,
      reviews: 124
    },
    {
      id: 6,
      name: "Northern Lights Adventure",
      description: "Chase the Aurora Borealis in Iceland and Norway. Winter wonderland with unique experiences and natural phenomena.",
      image: "/images/northern-lights.jpg",
      price: "From $2,199",
      duration: "8 days",
      destinations: ["Reykjavik", "Tromsø", "Bergen"],
      includes: ["Flights", "Hotels", "Northern Lights Tours", "Winter Activities"],
      rating: 4.8,
      reviews: 91
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">Curated Travel Packages</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
            Discover our carefully crafted travel packages designed to give you the perfect vacation experience. From cultural tours to adventure trips, we have something for everyone.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-300"
                  style={{ 
                    backgroundImage: `url(${pkg.image})`,
                    backgroundColor: '#e5e7eb' // fallback color
                  }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                  {pkg.duration}
                </div>
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Package Deal
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <span className="text-lg font-semibold text-blue-600">{pkg.price}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>

                {/* Destinations */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Destinations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.destinations.map((destination, index) => (
                      <span 
                        key={index}
                        className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Includes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((item, index) => (
                      <span 
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors duration-200">
                    Book Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                    Details
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

export default Packages;