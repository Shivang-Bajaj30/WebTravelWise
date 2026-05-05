import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signup } from '../lib/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    if (formData.username == "" || null) {
      setMessage({ type: 'error', text: 'Please enter your username.' });
      setLoading(false);
      return;
    }

    if (formData.email == "" || null) {
      setMessage({ type: 'error', text: 'Please enter your email.' });
      setLoading(false);
      return;
    }

    if (formData.password == "" || null) {
      setMessage({ type: 'error', text: 'Please enter your password.' });
      setLoading(false);
      return;
    }

    if (formData.confirmPassword == "" || null) {
      setMessage({ type: 'error', text: 'Please enter your confirm password.' });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setLoading(false);
      return;
    }

    try {
      const { username, email, password } = formData;
      const res = await signup({ name: username, email, password });
      if (res.error) {
        setMessage({ type: 'error', text: res.error });
      } else if (res.message) {
        setMessage({ type: 'success', text: res.message });
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Unknown response from server.' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Signup failed.' });
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {show ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-4.362M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.207 5.042M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
        </>
      )}
    </svg>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <img src="/images/signup.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-900/60 to-purple-900/70" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">Join TravelWise</h2>
            <p className="text-purple-200 text-lg max-w-md">
              Create your account and start planning unforgettable trips with AI-powered itineraries.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              {['🚀', '🌴', '⭐'].map((emoji, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="text-4xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create Account 🚀</h1>
            <p className="text-gray-500 dark:text-gray-400">Join us and start planning your adventures!</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="username">
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                name="username"
                id="username"
                type="text"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none text-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">
                Email Address
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                name="email"
                id="email"
                type="email"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none text-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none text-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-[42px] text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none text-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 pr-12"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-[42px] text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none transition-colors"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <EyeIcon show={showConfirmPassword} />
              </button>
            </div>

            {message.text && (
              <div className={`rounded-xl p-3 text-sm font-medium ${message.type === 'error'
                ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20'
                : message.type === 'success'
                  ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20'
                  : 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20'
                }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-xl px-6 py-3.5 text-white font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  Creating account...
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-sm mt-6 text-center text-gray-500 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;