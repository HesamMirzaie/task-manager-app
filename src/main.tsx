// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import HomePage from './pages/HomePage';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  { path: '*', element: <PageNotFound /> },
  { path: '/', element: <HomePage /> },
  { path: '/app', element: <App /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <Login /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
