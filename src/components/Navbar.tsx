import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);

  const location = useLocation();

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [user, setUser] = useState<any | null>(null);

  const isActive = (path: string): boolean => location.pathname === path;

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) setUser(JSON.parse(storedUser));
}, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node) &&
        desktopButtonRef.current &&
        !desktopButtonRef.current.contains(event.target as Node)
      ) {
        setIsDesktopDropdownOpen(false);
      }
    };

    if (isDesktopDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileUserDropdownOpen(false);
      }
    };

    if (isMobileUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileUserDropdownOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsMobileUserDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-100/80 via-white/60 to-red-100/80 border-b border-red-200 shadow-lg backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-19">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-extrabold text-red-700 tracking-tight hover:text-red-500 transition-all duration-300 hover:scale-105"
              >
                TravelWise
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                to="/"
                className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              >
                Home
              </Link>
              <Link
                to="/destinations"
                className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/destinations') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              >
                Destinations
              </Link>
              <Link
                to="/packages"
                className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/packages') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              >
                Packages
              </Link>
              <Link
                to="/about"
                className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/about') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${isActive('/contact') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Auth / User Icon */}
<div className="hidden lg:flex items-center gap-2 xl:gap-4 relative">
  {!user ? (
    <>
      <Link
        to="/login"
        className={`px-2 xl:px-4 py-2 rounded-lg font-semibold border border-red-200 transition-all duration-300 text-xs xl:text-base ${
          isActive('/login')
            ? 'bg-red-100 text-red-700 shadow'
            : 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm'
        }`}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className={`px-3 xl:px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm text-xs xl:text-base ${
          isActive('/signup')
            ? 'bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white shadow-lg'
            : 'bg-gradient-to-r from-red-500 via-pink-400 to-red-300 text-white hover:from-red-600 hover:via-pink-500 hover:to-red-400 hover:shadow-lg hover:scale-105'
        }`}
      >
        Sign Up
      </Link>
    </>

    
  ) : (
    <div className="relative flex items-center gap-6 xl:gap-8">
  {/* My Trips Link */}
  <Link
    to="/trips"
    className={`px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent text-sm xl:text-base ${
      isActive('/trips')
        ? 'bg-red-100 text-red-700 shadow'
        : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'
    }`}
  >
    My Trips
  </Link>

  {/* Profile Button + Dropdown */}
  <div className="relative" ref={desktopDropdownRef}>
    <button
      ref={desktopButtonRef}
      onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
      className="flex items-center gap-2 p-2 bg-white/70 rounded-full border border-red-300 hover:shadow transition" style={{ cursor: 'pointer' }} 
    >
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden">
        {user?.picture ? (
          <img src={user.picture} alt="profile" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm">{user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}</span>
        )}
      </div>
      <span className="font-semibold text-gray-700 ml-2">{user?.name ? user.name.split(' ')[0] : 'User'}</span>
    </button>

    {/* Dropdown */}
    {isDesktopDropdownOpen && (
      <div
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-red-200 text-sm text-gray-800 z-50"
      >
        <Link
          to="/profile"
          onClick={() => setIsDesktopDropdownOpen(false)} // ✅ closes on click
          className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
        >
          Profile
        </Link>
        <button
          onClick={() => {
            setIsDesktopDropdownOpen(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setUser(null);
            window.location.href = '/';
          }}
          className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600" style={{ cursor: 'pointer' }} 
        >
          Logout
        </button>
      </div>
    )}
  </div>
</div>
  )}
</div>

            {/* Mobile/Tablet Auth Links and Hamburger */}
            <div className="lg:hidden flex items-center gap-2 relative">
  {/* User Icon or Login/Signup */}
  {!user ? (
    <>
      <Link
        to="/login"
        className={`px-2 py-1.5 rounded-lg font-semibold border border-red-200 transition-all duration-300 text-xs whitespace-nowrap ${
          isActive('/login')
            ? 'bg-red-100 text-red-700 shadow'
            : 'text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm'
        }`}
      >
        Login
      </Link>
      <Link
        to="/signup"
        className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 shadow-sm text-xs whitespace-nowrap ${
          isActive('/signup')
            ? 'bg-gradient-to-r from-red-600 via-pink-500 to-red-400 text-white shadow-lg'
            : 'bg-gradient-to-r from-red-500 via-pink-400 to-red-300 text-white hover:from-red-600 hover:via-pink-500 hover:to-red-400 hover:shadow-lg'
        }`}
      >
        Sign Up
      </Link>
    </>
  ) : (
    <div className="relative" ref={mobileDropdownRef}>
      <button
        ref={mobileButtonRef}
        onClick={() => setIsMobileUserDropdownOpen(!isMobileUserDropdownOpen)}
        className="flex items-center gap-1.5 p-1.5 bg-white/70 rounded-full border border-red-300 hover:shadow transition " style={{ cursor: 'pointer' }} 
      >
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold overflow-hidden border border-gray-300">
          {user?.picture ? (
            <img src={user.picture} alt="profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">{user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}</span>
          )}
        </div>
      </button>

      {isMobileUserDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-red-200 text-sm text-gray-800 z-50"
        >
          <Link
            to="/trips"
            onClick={() => setIsMobileUserDropdownOpen(false)}
            className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
          >
            My Trips
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileUserDropdownOpen(false)}
            className="block px-4 py-2 hover:bg-red-50 hover:text-red-600"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              setUser(null);
              setIsMobileUserDropdownOpen(false);
              window.location.href = '/';
            }}
            className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )}

  {/* Hamburger Icon (stays at the end) */}
  <button
    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
    className="text-red-700 hover:text-red-500 focus:outline-none p-2 rounded-lg border border-red-200 shadow-sm transition-all duration-300 bg-white/80"
    aria-label="Toggle menu"
  >
    <FaBars className="w-6 h-6 sm:w-7 sm:h-7" />
  </button>
</div>
          </div>
        </div>
  </nav>

      {/* Mobile/Tablet Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-red-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-red-200">
            <Link
              to="/"
              className="text-xl font-extrabold text-red-700 tracking-tight hover:text-red-500"
              onClick={() => setIsDrawerOpen(false)}
            >
              TravelWise
            </Link>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-red-700 hover:text-red-500 p-2 rounded-lg"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-2 p-4 pt-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/trips"
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/trips') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
                onClick={() => setIsDrawerOpen(false)}
              >
                My Trips
              </Link>
            )}
            <Link
              to="/destinations"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/destinations') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Destinations
            </Link>
            <Link
              to="/packages"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/packages') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Packages
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/about') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border border-transparent ${isActive('/contact') ? 'bg-red-100 text-red-700 shadow' : 'text-gray-900 hover:text-red-600 hover:bg-red-50 hover:shadow-sm'}`}
              onClick={() => setIsDrawerOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;