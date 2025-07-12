import React, { use, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
} from 'lucide-react';
import type { User } from '../../DataConfig/Interface';
import { NavigationItems } from '../../DataConfig/DataLoader';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const user: User = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {} as User;
  const location = useLocation();

  useEffect(() => {
    // Fetch user data here if needed
    // setUser(fetchedUserData);
    fetchData();
  }, []);

  const fetchData = async () => {

  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-75 bg-slate-900 border-r border-slate-700 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <Link to="/admin" className="flex items-center space-x-2 text-white">
            <img
              src='https://companieslogo.com/img/orig/FPT.VN_BIG.D-b2da87b8.png?t=1722927800'
              className="h-6 object-cover bg-gradient-to-r from-blue-500 via-orange-500 to-green-500"
            />
            <span className="text-xl font-bold">FPT Admission System</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {NavigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                    onClick={() => onClose()}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-white" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              {user.avata ? (
                <img
                  src={user.avata}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-lg font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
