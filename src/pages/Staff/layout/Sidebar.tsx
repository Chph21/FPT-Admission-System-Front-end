import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Building,
  FileText,
  BarChart3,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'majors', label: 'Majors', icon: GraduationCap },
  { id: 'campuses', label: 'Campuses', icon: Building },
  { id: 'admissionschedule', label: 'Manage Schedule', icon: BarChart3   },
  { id: 'tickets', label: 'Tickets', icon: FileText },
  { id: 'posts', label: 'Posts', icon: FileText },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 mt-5">
        <h1 className="text-xl font-bold text-gray-900">FPT Admission</h1>
        <p className="text-sm text-gray-600">Staff Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-3 w-full">
        {menuItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-left transition-all duration-200 ${isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
