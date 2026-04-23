import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileUserDropdownOpen, setIsMobileUserDropdownOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileUserDropdownOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
    setIsMobileUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsDesktopDropdownOpen(false);
    setIsMobileUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
      isActive(path)
        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm'
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10'
    }`;

  const ThemeToggleButton = ({ className = '' }: { className?: string }) => (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-indigo-500/20 text-yellow-400 hover:bg-indigo-500/30'
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400'
      } ${className}`}
      aria-label="Toggle theme"
      style={{ cursor: 'pointer' }}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun → shown in dark mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        {/* Moon → shown in light mode */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </div>
    </button>
  );

  return (
    <>
      {/* Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-lg shadow-indigo-500/5 dark:shadow-indigo-500/10 border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-extrabold tracking-tight transition-all duration-300 hover:scale-105 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent"
              >
                TravelWise
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/" className={navLinkClass('/')}>Home</Link>
              <Link to="/destinations" className={navLinkClass('/destinations')}>Destinations</Link>
              <Link to="/packages" className={navLinkClass('/packages')}>Packages</Link>
              <Link to="/about" className={navLinkClass('/about')}>About</Link>
              <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-3 relative">
              <ThemeToggleButton />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-xl font-semibold border transition-all duration-300 text-sm ${
                      isActive('/login')
                        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-600 shadow-sm'
                        : 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-500/10 hover:shadow-sm'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md text-sm ${
                      isActive('/signup')
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105'
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative flex items-center gap-1">
                  <Link to="/trips" className={navLinkClass('/trips')}>My Trips</Link>

                  <div className="relative" ref={desktopDropdownRef}>
                    <button
                      ref={desktopButtonRef}
                      onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pl-2 bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                      style={{ cursor: 'pointer' }}
                    >
                      <span className="font-medium text-sm text-gray-700 dark:text-gray-300 ml-1">
                        {user?.name ? user.name.split(' ')[0] : 'User'}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                        {user?.picture ? (
                          <img src={user.picture} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm">{user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}</span>
                        )}
                      </div>
                    </button>

                    {isDesktopDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user?.email || ''}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            onClick={() => setIsDesktopDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            <span>👤</span> Profile
                          </Link>
                          <Link
                            to="/trips"
                            onClick={() => setIsDesktopDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            <span>🧳</span> My Trips
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-700 py-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            style={{ cursor: 'pointer' }}
                          >
                            <span>🚪</span> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Right */}
            <div className="lg:hidden flex items-center gap-2 relative">
              <ThemeToggleButton className="!p-2" />

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-1.5 rounded-xl font-semibold border transition-all duration-300 text-xs whitespace-nowrap ${
                      isActive('/login')
                        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-600 shadow-sm'
                        : 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-500/10'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 shadow-sm text-xs whitespace-nowrap ${
                      isActive('/signup')
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
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
                    className="flex items-center gap-1.5 p-1.5 bg-white/70 dark:bg-gray-800/70 rounded-full border border-gray-200 dark:border-gray-700 hover:shadow transition"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold overflow-hidden">
                      {user?.picture ? (
                        <img src={user.picture} alt="profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-sm">{user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                  </button>

                  {isMobileUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-sm overflow-hidden">
                      <Link
                        to="/trips"
                        onClick={() => setIsMobileUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span>🧳</span> My Trips
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span>👤</span> Profile
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          style={{ cursor: 'pointer' }}
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none p-2 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 bg-white/80 dark:bg-gray-800/80"
                aria-label="Toggle menu"
              >
                <FaBars className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200/50 dark:border-gray-700/50">
            <Link
              to="/"
              className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
              onClick={() => setIsDrawerOpen(false)}
            >
              TravelWise
            </Link>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-xl transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-1 p-4 pt-6">
            {[
              { to: '/', label: 'Home' },
              ...(user ? [{ to: '/trips', label: 'My Trips' }] : []),
              { to: '/destinations', label: 'Destinations' },
              { to: '/packages', label: 'Packages' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive(to)
                    ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10'
                }`}
                onClick={() => setIsDrawerOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;