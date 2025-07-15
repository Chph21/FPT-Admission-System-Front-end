import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Building,
  FileText,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/staff' },
  { id: 'majors', label: 'Majors', icon: GraduationCap, path: '/staff/majors' },
  { id: 'campuses', label: 'Campuses', icon: Building, path: '/staff/campuses' },
  { id: 'posts', label: 'Posts', icon: FileText, path: '/staff/posts' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
