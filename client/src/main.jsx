import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Home,
  About,
  Catering,
  Contact,
  Gifts,
  Location,
  Menu,
  News,
  Order,
  Rewards,
} from './Pages/index';

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
        element: <Contact />,
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
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
