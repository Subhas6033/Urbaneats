import React from 'react';
import { Layout, Nav, Footer } from './Components/index';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PageLoader } from './Components/index';

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
          <main className="overflow-x-hidden">
            <Outlet />
          </main>
          <Footer />
        </Layout>
      )}
    </>
  );
};

export default App;
