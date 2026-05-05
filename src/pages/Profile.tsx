import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { update, getUserTrips } from '../lib/api';
import type { User } from "../lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [tripCount, setTripCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Verify dynamically with backend
    fetch("http://127.0.0.1:5000/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("User not found or token invalid");
        return res.json();
      })
      .then(data => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Sync fresh data
      })
      .catch(err => {
        // If user was deleted or token is invalid
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  useEffect(() => {
    if (user?.id) {
      getUserTrips(user.id)
        .then(trips => setTripCount(trips.length))
        .catch(err => console.error("Failed to fetch trip count", err));
    }
  }, [user?.id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const handleEditClick = () => {
    setEditForm({ name: user?.name || '', email: user?.email || '' });
    setIsEditing(true);
    setMessage(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await update(editForm);
      if (res.user) {
        setUser(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage(null);
  };

  if (!user) return null;

  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-50/30 dark:to-indigo-950/20">
      {/* Hero Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 dark:from-indigo-700 dark:via-purple-800 dark:to-indigo-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-28 sm:pt-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* {user.picture ? (
                  <img src={user.picture} alt="Profile" className="w-full h-full object-cover" />
                ) : ( */}
                <span className="text-5xl sm:text-6xl font-bold text-white">{initial}</span>
                {/* ) */}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              {user?.name || 'Traveler'}
            </h1>
            <p className="text-indigo-200 text-lg">{user.email || ''}</p>
          </motion.div>
        </div>
      </div>

      {/* Content overlapping banner */}
      <div className="max-w-4xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-10 pb-16">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[
            { label: 'Trips Planned', value: tripCount.toString(), icon: '✈️' },
            // { label: 'Destinations', value: '7', icon: '📍' },
            // { label: 'Days Traveling', value: '21', icon: '📅' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                ⚙️
              </span>
              Account Details
            </h2>
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${message.type === 'error'
              ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
              : 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
              }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-5">
            {/* Full Name */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <span className="text-xl">👤</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-0.5">{user.name || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <span className="text-xl">📧</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-base font-semibold text-gray-900 dark:text-white mt-0.5">{user.email || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <span className="text-xl">📅</span>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member Since</p>
                <p className="text-base font-semibold text-gray-900 dark:text-white mt-0.5">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })
                    : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-teal-100 dark:bg-teal-500/20 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
              ⚡
            </span>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/trips"
              className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🧳</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">My Trips</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">View your planned trips</p>
              </div>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 p-4 bg-teal-50 dark:bg-teal-500/10 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-500/20 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Plan a Trip</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Generate AI itinerary</p>
              </div>
            </Link>

            <Link
              to="/destinations"
              className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-500/10 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Explore Destinations</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Discover new places</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors group text-left w-full"
              style={{ cursor: 'pointer' }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🚪</span>
              <div>
                <p className="font-semibold text-red-600 dark:text-red-400">Logout</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
