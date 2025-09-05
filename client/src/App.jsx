import React from 'react';
import { Layout, Nav, Footer } from './Components/index';
import { Outlet } from 'react-router-dom';
import PageLoader from './Components/Loader/Loader';

const App = () => {
  return (
    <>
      <PageLoader />
      <Layout>
        <Nav />
        <main className="overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </Layout>
    </>
  );
};

export default App;
