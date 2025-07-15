
import React from 'react';
import { 
  Home, 
  GraduationCap, 
  Building, 
  FileText, 
  Users, 
  Settings,
  BarChart3,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'majors', label: 'Majors', icon: GraduationCap },
  { id: 'campuses', label: 'Campuses', icon: Building },
  { id: 'admissionschedule', label: 'Manage Schedule', icon: BarChart3 },
  { id: 'tickets', label: 'Tickets', icon: FileText },
  { id: 'posts', label: 'Posts', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 mt-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FPT Admission</h1>
            <p className="text-sm text-gray-600">Staff Dashboard</p>
          </div>
        </div>
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