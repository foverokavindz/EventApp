import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventDetailsPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetailsPage';
import EditEventPage from './pages/EditEventPage';
import ErrorPage from './pages/ErrorPage';
import NewEventPage from './pages/NewEventPage';
import EventsPage, { loader as eventLoader } from './pages/EventsPage';
import RootLayout from './pages/RootLayout';
import EventRoot from './pages/EventRoot';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },
          {
            path: ':id',
            id: 'event-details',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailsPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
