import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const { events } = useLoaderData();

  //if (data.isError) <p>{data.message}</p>;
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events/');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events' };
    throw json(
      { message: 'Could not fetch events' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
