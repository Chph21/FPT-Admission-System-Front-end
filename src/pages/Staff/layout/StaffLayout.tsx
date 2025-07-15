import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../layout/Sidebar';
import { Header } from '../layout/Header';
// Removed unused imports



const StaffLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Staff Dashboard" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
