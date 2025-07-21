import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    <div className="w-80 bg-gradient-to-b from-orange-600 to-orange-700 shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between h-20 px-4 border-b border-orange-500 bg-orange-700">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <img
            src='https://companieslogo.com/img/orig/FPT.VN_BIG.D-b2da87b8.png?t=1722927800'
            alt="FPT Logo"
            className=" w-12 object-cover text-white"
          />
        <span className="text-3xl font-bold text-white">FPT Admission</span>


        </Link>
        {/* <p className="text-2xl text-white-600">Staff Dashboard</p> */}
      </div>

      <nav className="flex-1 p-4 space-y-2 w-full">
        {menuItems.map(({ id, label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`w-full flex items-center text-xl space-x-5 px-6 py-4 rounded-lg text-left transition-all duration-200 ${isActive
                  ? 'bg-white text-3xl font-bold text-orange-700 shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10 hover:text-orange-200'
                }`}

            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-orange-700' : 'text-white'}`} />
              <span className="font-semibold">{label}</span>
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
