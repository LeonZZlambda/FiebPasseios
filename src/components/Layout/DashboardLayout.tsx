import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Menu/Sidebar';

export default function DashboardLayout(): JSX.Element {
  return (
    <div
      className="dashboard-layout d-flex"
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}
    >
      <Sidebar />
      <main
        className="flex-grow-1 p-md dashboard-main"
        style={{ overflowY: 'auto', overflowX: 'hidden', height: '100vh' }}
      >
        <Outlet />
      </main>
    </div>
  );
}
