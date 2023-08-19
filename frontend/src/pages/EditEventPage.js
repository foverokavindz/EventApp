import { useRouteLoaderData, Await } from 'react-router-dom'; // to access higher level loader
import { Suspense } from 'react';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const data = useRouteLoaderData('event-details');
  const event = data.event;

  return (
    <>
      <h1 align="center">Edit Event</h1>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvents) => <EventForm method="PATCH" event={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EditEventPage;
