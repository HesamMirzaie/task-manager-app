import { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const handleSignOut = useAuth((state) => state.handleSignOut);
  const navigate = useNavigate();

  // Fetch the user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    const { success } = await handleSignOut();
    if (success) {
      localStorage.removeItem('user'); // Remove the user from localStorage
      navigate('/login');
    } else {
      console.error('Failed to sign out');
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">Task Manager</span>
            </div>
          </div>
          {user ? (
            <div className="hidden sm:ml-6 sm:flex sm:items-center relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </button>
              {isOpen && (
                <div className="absolute top-12 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className=" my-auto px-4 py-2 hover:border-b-2 hover:border-black transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
