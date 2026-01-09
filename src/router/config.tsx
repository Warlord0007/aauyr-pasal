import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const BookingPage = lazy(() => import('../pages/booking/page'));
const ServiceBookingPage = lazy(() => import('../pages/service-booking/page'));
const PackageBookingPage = lazy(() => import('../pages/package-booking/page'));
const GiftVoucherPage = lazy(() => import('../pages/gift-voucher/page'));
const CheckoutPage = lazy(() => import('../pages/checkout/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/booking',
    element: <BookingPage />,
  },
  {
    path: '/service-booking',
    element: <ServiceBookingPage />,
  },
  {
    path: '/package-booking',
    element: <PackageBookingPage />,
  },
  {
    path: '/gift-voucher',
    element: <GiftVoucherPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
