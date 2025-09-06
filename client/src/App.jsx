import React, { useEffect, useState } from 'react';
import {
  Layout,
  Nav,
  Footer,
  PageLoader,
  ScrollToTop,
} from './Components/index';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Layout>
          <Nav />
          <main className="overflow-x-hidden overflow-y-auto">
            {/* <ScrollToTop /> */}
            <Outlet />
          </main>
          <Footer />
        </Layout>
      )}
    </>
  );
};

export default App;
