import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useAuth';

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const handleLogin = useAuth((state) => state.handleLogin); // Import the login function from zustand store
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    const { success, error: loginError } = await handleLogin(email, password);
    if (success) {
      navigate('/app');
    } else {
      setError(loginError || 'An unexpected error occurred.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="space-y-2 mb-4">
          <h1 className="text-2xl font-bold text-center">Sign in</h1>
          <p className="text-center text-gray-500">
            Enter your email and password to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
