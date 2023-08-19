import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventDetailsPage = () => {
  const { event, events } = useRouteLoaderData('event-details');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent}></EventItem>}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents}></EventsList>}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailsPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event' },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

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

// instead of useEffect
export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    event: loadEvent(id),
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.id;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 });
  } else {
  }

  return redirect('/events');
}
