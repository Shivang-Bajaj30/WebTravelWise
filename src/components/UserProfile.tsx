import { useState, useRef, useEffect } from 'react';

const placeholderUser = {
  name: 'John Doe',
  email: 'john@example.com',
  picture: '',
};

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const currentUser = placeholderUser;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const getUserInitials = () => {
    if (!currentUser || !currentUser.name) return '?';
    return currentUser.name.trim().charAt(0).toUpperCase();
  };

  const handleImageError = () => setImageError(true);
  const canShowImage = currentUser && currentUser.picture && !imageError;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow" onClick={toggleDropdown}>
        {canShowImage ? (
          <img
            src={currentUser.picture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            onError={handleImageError}
          />
          ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center rounded-full">
            <span className="text-white font-bold text-xl">{getUserInitials()}</span>
          </div>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-14 right-0 bg-white rounded-lg shadow min-w-[280px] z-50 overflow-hidden">
          <div className="flex items-center p-5 bg-gray-50 border-b border-gray-200">
            {canShowImage ? (
              <img
                src={currentUser.picture}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-4 -mt-1"
                onError={handleImageError}
              />
            ) : (
              <div className="w-[50px] h-[50px] bg-blue-600 flex items-center justify-center rounded-full mr-4 ml-[-5px]">
                <span className="text-white font-bold text-2xl">{getUserInitials()}</span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-base text-black mb-1">{currentUser?.name || 'User'}</p>
              <p className="text-sm text-black opacity-85">{currentUser?.email || ''}</p>
            </div>
          </div>
          <div className="py-2">
            <button className="flex items-center px-5 py-3 w-full text-left hover:bg-gray-50">
              <span className="mr-4 w-6 text-center">🧳</span>
              <span className="text-sm text-black">My Trips</span>
            </button>
            <button className="flex items-center px-5 py-3 w-full text-left hover:bg-gray-50">
              <span className="mr-4 w-6 text-center">👤</span>
              <span className="text-sm text-black">Profile</span>
            </button>
            <button className="flex items-center px-5 py-3 w-full text-left hover:bg-gray-50">
              <span className="mr-4 w-6 text-center">⚙️</span>
              <span className="text-sm text-black">Settings</span>
            </button>
            <button className="flex items-center px-5 py-3 w-full text-left border-t border-gray-200 mt-2 hover:bg-red-50">
              <span className="mr-4 w-6 text-center text-red-600">🚪</span>
              <span className="text-sm text-black font-semibold">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 