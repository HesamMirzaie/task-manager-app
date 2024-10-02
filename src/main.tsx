import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import HomePage from './pages/homepage/HomePage';
import { SignUp } from './pages/signup/SignUp';
import { Login } from './pages/login/Login';
import PageNotFound from './pages/404 page/PageNotFound';
import { DashboardLayout } from './pages/dashboard/DashboardLayout';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  // { path: '/signup', element: <SignUp /> },
  // { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <DashboardLayout /> },
  { path: '*', element: <PageNotFound /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
