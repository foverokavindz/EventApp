import { useFetcher } from 'react-router-dom';
import { useEffect } from 'react';
// use fetcher to intertact with some loader without transitioning with route - work behind the schene - without tiggering any route changes - wihtout loading another page or route
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher; // state is use to tell its loader state...submit welda idle da

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
