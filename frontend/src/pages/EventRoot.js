import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

function RootLayout() {
  return (
    <>
      <EventsNavigation />

      <Outlet />
    </>
  );
}

export default RootLayout;
