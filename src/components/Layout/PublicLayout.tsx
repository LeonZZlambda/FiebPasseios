import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function PublicLayout(): JSX.Element {
  return (
    <div className="public-layout d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
