//import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
  return (
    <>
      <h1 align="center">New Event</h1>
      <EventForm method="post" />
    </>
  );
};

export default NewEventPage;
