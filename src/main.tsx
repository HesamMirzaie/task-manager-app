// src/index.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import HomePage from './pages/homepage/HomePage';
import { SignUp } from './pages/signup/SignUp';
import { Login } from './pages/login/Login';
import PageNotFound from './pages/404 page/PageNotFound';

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
