import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex flex-col items-center">
          <AlertCircle className="h-24 w-24 text-red-500" />
          <h1 className="mt-6 text-9xl font-extrabold text-gray-900">404</h1>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Page not found
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/app"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
