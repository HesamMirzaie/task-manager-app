import { useState } from 'react';
import { User, LogOut } from 'lucide-react';

type NavbarProps = {
  handleLogOut: () => void;
  user: any;
};

export function Navbar({ handleLogOut, user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

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
          {
            <div className="hidden sm:ml-6 sm:flex sm:items-center relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </button>
              {isOpen && (
                <div className="absolute top-12 right-0 mt-2 w-56 rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-10 focus:outline-none">
                  <div className="flex justify-center p-4 bg-gray-50 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">
                      {user.user.email}
                    </span>
                  </div>
                  <div
                    onClick={handleLogOut}
                    className="cursor-pointer flex items-center justify-center px-4 py-3 bg-pink-100 text-gray-700 hover:bg-pink-200 transition-colors duration-200 ease-in-out"
                  >
                    <LogOut className="mr-2 h-5 w-5 text-gray-600" />
                    <span className="font-medium">Log out</span>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </nav>
  );
}
