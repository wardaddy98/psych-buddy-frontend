import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
const Lobby = lazy(() => import('../pages/Lobby'));
const Explore = lazy(() => import('../pages/Explore'));
const MyThreads = lazy(() => import('../pages/MyThreads'));
const SavedThreads = lazy(() => import('../pages/SavedThreads'));
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));
const ThreadRoom = lazy(() => import('../pages/ThreadRoom'));

export const AuthenticatedRoutes: RouteObject[] = [
  {
    path: '/lobby',
    element: (
      <ProtectedRoute>
        <Lobby />
      </ProtectedRoute>
    ),
  },

  {
    path: '/explore',
    element: (
      <ProtectedRoute>
        <Explore />
      </ProtectedRoute>
    ),
  },

  {
    path: '/myThreads',
    element: (
      <ProtectedRoute>
        <MyThreads />
      </ProtectedRoute>
    ),
  },

  {
    path: 'savedThreads',
    element: (
      <ProtectedRoute>
        <SavedThreads />
      </ProtectedRoute>
    ),
  },

  {
    path: '/thread-room/:threadId',
    element: (
      <ProtectedRoute>
        <ThreadRoom />
      </ProtectedRoute>
    ),
  },
];
