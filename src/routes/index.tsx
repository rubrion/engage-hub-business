import React, { lazy, ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Loading from '../components/Loading';
import Layout from '../layout/Layout';
import ErrorPage from '../pages/ErrorPage';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const BlogList = lazy(() => import('../pages/Blog/BlogList'));
const BlogPost = lazy(() => import('../pages/Blog/BlogPost'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const lazyLoad = (Component: React.ComponentType): ReactNode => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Router configuration with all v7 future flags enabled
const routerConfig = {
  future: {
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
  },
};

const routerProviderConfig = {
  future: {
    v7_startTransition: true,
  },
};

export default function AppRouter() {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={lazyLoad(Home)} />
            <Route path="about" element={lazyLoad(About)} />
            <Route path="contact" element={lazyLoad(Contact)} />
            <Route path="blog" element={lazyLoad(BlogList)} />
            <Route path="blog/:slug" element={lazyLoad(BlogPost)} />
            <Route path="dashboard" element={lazyLoad(Dashboard)} />
            <Route path="profile" element={lazyLoad(Profile)} />
            <Route path="*" element={lazyLoad(NotFound)} />
          </Route>
        ),
        routerConfig
      )}
      future={routerProviderConfig.future}
    />
  );
}
