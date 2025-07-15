
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Building,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'majors', label: 'Majors', icon: GraduationCap },
  { id: 'campuses', label: 'Campuses', icon: Building },
  { id: 'posts', label: 'Posts', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-4 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            JS
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">John Smith</p>
            <p className="text-xs text-gray-600">Admin Staff</p>
          </div>
        </div>
      </div>
    </div>
  );
};