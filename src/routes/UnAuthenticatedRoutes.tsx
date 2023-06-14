import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const UnprotectedRoute = lazy(() => import('./UnprotectedRoute'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Landing = lazy(() => import('../pages/Landing'));

export const UnAuthenticatedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <UnprotectedRoute>
        <Landing />
      </UnprotectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <UnprotectedRoute>
        <Login />
      </UnprotectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <UnprotectedRoute>
        <Register />
      </UnprotectedRoute>
    ),
  },
];
