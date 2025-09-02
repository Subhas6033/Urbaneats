import React from 'react';
import { Layout, Nav, Footer } from './Components/index';
import { Outlet } from 'react-router-dom';


const App = () => {
  return (
      <Layout>
        <Nav />
        <main className="overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </Layout>
  );
};

export default App;
