import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Building,
  FileText,
  BarChart3,
  LogOut,
  User,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/staff/dashboard' },
  { id: 'majors', label: 'Majors', icon: GraduationCap, path: '/staff/majors' },
  { id: 'campuses', label: 'Campuses', icon: Building, path: '/staff/campuses' },
  { id: 'admissionschedule', label: 'Manage Schedule', icon: BarChart3, path: '/staff/admission-schedule' },
  { id: 'tickets', label: 'Tickets', icon: FileText, path: '/staff/tickets' },
  { id: 'posts', label: 'Posts', icon: FileText, path: '/staff/posts' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 mt-5">
        <h1 className="text-xl font-bold text-gray-900">FPT Admission</h1>
        <p className="text-sm text-gray-600">Staff Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 w-full">
        {menuItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer transform hover:scale-105 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* User section and logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50">
          <User className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Staff User</p>
            <p className="text-xs text-gray-500">staff@fpt.edu.vn</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 mt-3 rounded-lg text-left transition-all duration-200 cursor-pointer transform hover:scale-105 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
