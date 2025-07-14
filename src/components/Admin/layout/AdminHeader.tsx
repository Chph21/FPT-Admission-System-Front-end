import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import type { User } from '../../DataConfig/Interface';

interface HeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {

    const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {} as User;
  
  return (
    <header className="bg-gradient-to-r from-orange-600 to-orange-700 border-b border-orange-500 h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white hover:text-orange-200 transition-colors duration-200"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Search bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-orange-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm ứng viên, người dùng..."
            className="block w-80 pl-10 pr-3 py-2 bg-white/90 backdrop-blur-sm border border-orange-300 rounded-lg text-sm text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-white hover:text-orange-200 transition-colors duration-200 hover:bg-white/10 rounded-lg">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* Profile dropdown placeholder */}
        <div className="relative">
          <button className="flex items-center space-x-2 text-sm font-medium text-white hover:text-orange-200 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
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
            <span className="hidden md:block">{user.name || 'Admin'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
