import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // update with correct path

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

const Home: React.FC = () => {
  const images: string[] = [
    '/images/bg1.jpg',
    '/images/bg2.jpg',
    '/images/bg3.jpg',
    '/images/bg4.jpg',
    '/images/mountains.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsAnimating(true);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  useEffect(() => {
    images.forEach((img) => {
      const preloadImg = new window.Image();
      preloadImg.src = img;
    });
  }, [images]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (location.length < 3) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [location]);

  const handleSuggestionClick = (suggestion: NominatimResult) => {
    setLocation(suggestion.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      navigate('/trip-details', { state: { selectedLocation: location } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center h-[45vh] sm:h-[60vh] lg:h-[80vh] mt-[-3px]">
        {isAnimating && prevImageIndex !== null && (
          <motion.div
            key={images[prevImageIndex] + '-prev'}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[prevImageIndex]})`,
              filter: 'brightness(0.75)',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        )}
        <motion.div
          key={images[currentImageIndex] + '-current'}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            filter: 'brightness(0.65)',
          }}
          initial={{ opacity: prevImageIndex === null ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prevImageIndex === null ? 0 : 0.7, ease: 'easeInOut' }}
        />
        <div className="relative z-10 flex flex-col items-center px-4 text-center w-full max-w-3xl mx-auto">
          <h1 className="text-white font-bold mb-4 leading-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
            Discover Your Next Adventure
          </h1>
          <p className="text-white mb-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-sm sm:text-lg md:text-xl lg:text-2xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
            Plan your perfect trip with TravelWise – explore breathtaking destinations and curated packages.
          </p>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full max-w-xs sm:max-w-md relative z-[1010]">
            <div className="relative w-full sm:w-auto flex-1">
              <input
                type="text"
                ref={inputRef}
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                placeholder="Where would you like to go?"
                className="px-4 py-2 rounded-lg text-sm sm:text-base w-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900"
              />
              {showSuggestions && suggestions.length > 0 && (

                <ul
  className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 z-[1000] max-h-60 overflow-y-auto"
>
  {suggestions.map((suggestion, index) => (
    <li
      key={index}
      onClick={() => handleSuggestionClick(suggestion)}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {suggestion.display_name}
    </li>
  ))}
</ul>

              )}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:from-orange-600 hover:to-red-700 transition-colors duration-200"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Santorini, Greece',
              image: '/images/bg1.jpg',
              description: 'Whitewashed villages, blue domes, and breathtaking sunsets over the Aegean Sea.'
            },
            {
              name: 'Kyoto, Japan',
              image: '/images/bg2.jpg',
              description: 'Ancient temples, cherry blossoms, and tranquil gardens in the heart of Japan.'
            },
            {
              name: 'Swiss Alps',
              image: '/images/mountains.jpg',
              description: 'Majestic peaks, alpine lakes, and world-class hiking and skiing.'
            }
          ].map((dest, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-2xl border border-gray-100">
              <div className="h-40 sm:h-48 md:h-56 w-full relative">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="object-cover w-full h-full"
                  style={{ filter: 'brightness(0.92)' }}
                />
                <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-xs font-bold text-gray-700 shadow">Featured</div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{dest.name}</h3>
                <p className="text-gray-600 mt-1 text-base flex-1">{dest.description}</p>
                <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-200 w-max self-start">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;