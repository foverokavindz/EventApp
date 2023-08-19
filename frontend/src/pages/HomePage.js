import { useNavigate } from 'react-router-dom';

import PageContent from '../components/PageContent';

const HomePage = () => {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('events');
  }
  return (
    <>
      <PageContent title={'Welcome'}>
        <p>Browse all our amazing events </p>
        <button onClick={navigateHandler}> See events</button>
      </PageContent>
    </>
  );
};

export default HomePage;
