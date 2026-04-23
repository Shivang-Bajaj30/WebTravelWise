import { Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import ItineraryPage from './pages/ItineraryPage';
import TripDetailsPage from './pages/TripDetails';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';

// ScrollToTop component to handle scrolling on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Footer = () => (
  <footer className="bg-gray-50 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            TravelWise
          </Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
            AI-powered travel itinerary planner. Discover, plan, and explore the world with personalized recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5">
            {[
              { to: '/destinations', label: 'Destinations' },
              { to: '/packages', label: 'Packages' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Features</h4>
          <ul className="space-y-2.5">
            {['AI Itineraries', 'Smart Hotels', 'Live Navigation', 'Budget Planning'].map((item) => (
              <li key={item}>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2.5">
            <li className="text-sm text-gray-600 dark:text-gray-400">📧 shivang.bajaj30@gmail.com</li>
            <li className="text-sm text-gray-600 dark:text-gray-400">📞 +91 9810739441</li>
            <li className="text-sm text-gray-600 dark:text-gray-400">🕐 24/7 Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          © {new Date().getFullYear()} TravelWise. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <span key={item} className="text-sm text-gray-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const App = () => (
  <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
    <Navbar />
    <div className="pt-16 sm:pt-18 flex-1">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/trip-details" element={<TripDetailsPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    <Footer />
  </div>
);

export default App;