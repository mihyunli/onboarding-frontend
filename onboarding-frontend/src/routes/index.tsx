import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
// pages
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import Profile from '../pages/Profile';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <BlosgList />, index: true },
        { path: ':id', element: <BlogDetail /> },
        { path: 'create', element: <BlogDetail /> },
      ],
    },
    {
      path: '/user/:id',
      element: <DashboardLayout />,
      children: [{ path: '', element: <Profile />, index: true }],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const BlosgList = Loadable(lazy(() => import('../pages/blog/List')));
const BlogDetail = Loadable(lazy(() => import('../pages/blog/Detail')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
