import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import {
  Home,
  About,
  Catering,
  ContactPage,
  Gifts,
  Location,
  Menu,
  News,
  Order,
  Rewards,
  Payment,
  CateringBookPage,
  Signup,
  Login,
} from './Pages/index';

import { Provider } from 'react-redux';
import { store } from './Store/Store.js';
import ErrorFallback from './Components/Err/ErrorBoundary.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/catering',
        element: <Catering />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/gifts',
        element: <Gifts />,
      },
      {
        path: '/location',
        element: <Location />,
      },
      {
        path: '/menu',
        element: <Menu />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/orders',
        element: <Order />,
      },
      {
        path: '/rewards',
        element: <Rewards />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/book-catering',
        element: <CateringBookPage />,
      },
      {
        path: '/user/signup',
        element: <Signup />,
      },
      {
        path: '/user/login',
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        {/* </PersistGate> */}
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
