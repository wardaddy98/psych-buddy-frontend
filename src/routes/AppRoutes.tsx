import { Suspense, lazy } from 'react';
import { Outlet, RouteObject, useRoutes } from 'react-router-dom';
import Loader from '../components/Loader';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { UnAuthenticatedRoutes } from './UnAuthenticatedRoutes';
const NotFound = lazy(() => import('../pages/NotFound'));
const MainLayout = lazy(() => import('../components/MainLayout'));

const AppRoutes = () => {
  const routes: RouteObject[] = [
    {
      path: '',
      element: (
        <Suspense fallback={<Loader loaderText='Almost there 😁⏳...' />}>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </Suspense>
      ),
      children: [...AuthenticatedRoutes, ...UnAuthenticatedRoutes],
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loader />}>
          <NotFound />
        </Suspense>
      ),
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
