import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import type { User } from '../../DataConfig/Interface';

interface HeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {

    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {} as User;
  
  return (
    <header className="bg-slate-900 border-b border-slate-700 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Search bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search applications, users..."
            className="block w-80 pl-10 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile dropdown placeholder */}
        <div className="relative">
          <button className="flex items-center space-x-2 text-sm font-medium text-white hover:text-slate-300 transition-colors duration-200">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {user.avata ? (
                <img
                  src={user.avata}
                  alt="User Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-lg font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
