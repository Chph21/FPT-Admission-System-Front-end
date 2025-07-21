import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    let user: any = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch {}
    }
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-white p-6 shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
