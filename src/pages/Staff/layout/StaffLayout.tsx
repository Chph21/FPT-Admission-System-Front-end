import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Header } from '../layout/Header';
const StaffLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    let user: any = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch {}
    }
    if (!user || user.role !== 'STAFF') {
      navigate('/');
    }
  }, [navigate]);
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
