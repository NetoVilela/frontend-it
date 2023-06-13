import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import ProtectedRoute from './components/ProtectedRoute';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Crypto = Loader(lazy(() => import('src/pages/Dashboards/Crypto')));
const Login = Loader(lazy(() => import('src/pages/Login')));
const UsersForm = Loader(lazy(() => import('src/pages/Users/Form')));
const UsersList = Loader(lazy(() => import('src/pages/Users/List')));
const MoviesList = Loader(lazy(() => import('src/pages/Movies/List')));

// Status

const Status404 = Loader(
  lazy(() => import('src/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/pages/Status/Status500'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/login" replace />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element:
              <ProtectedRoute>
                <Navigate to="404" replace />
              </ProtectedRoute>
          },
          {
            path: '404',
            element:
              <ProtectedRoute>
                <Status404 />
              </ProtectedRoute>
          },
          {
            path: '500',
            element:
              <ProtectedRoute>
                <Status500 />
              </ProtectedRoute>
          },
        ]
      },
      {
        path: '*',
        element:
          <ProtectedRoute>
            <Status500 />
          </ProtectedRoute>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element:
          <ProtectedRoute>
            <Crypto />
          </ProtectedRoute>
      },
    ]
  },
  {
    path: 'users',
    element: <SidebarLayout />,
    children: [
      {
        path: 'register',
        element:
          <ProtectedRoute>
            <UsersForm />
          </ProtectedRoute>
      },
      {
        path: 'list',
        element:
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
      },
    ]
  },
  {
    path: 'movies',
    element: <SidebarLayout />,
    children: [
      {
        path: 'list',
        element:
          <ProtectedRoute>
            <MoviesList />
          </ProtectedRoute>
      },
    ]
  },
];

export default routes;
