import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import HomePage from './pages/homepage/HomePage';
import { SignUp } from './pages/signup/SignUp';
import { Login } from './pages/login/Login';
import PageNotFound from './pages/404 page/PageNotFound';
import DashboardLayout from './pages/dashboard/layout';
import EachBoardPage from './pages/dashboard/boardId/KanbanBoard';

const router = createBrowserRouter([
  { path: '*', element: <PageNotFound /> },
  { path: '/', element: <HomePage /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/dashboard', element: <DashboardLayout /> },
  { path: '/dashboard/:boardId', element: <EachBoardPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
