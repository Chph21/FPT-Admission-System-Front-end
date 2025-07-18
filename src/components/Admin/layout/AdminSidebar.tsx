import React, { useEffect } from 'react';
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
        fixed inset-y-0 left-0 z-50 w-75 bg-gradient-to-b from-orange-600 to-orange-700 border-r 
        border-orange-500 transform transition-transform duration-300 ease-in-out shadow-xl
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-orange-500 bg-orange-700">
          <Link to="/admin" className="flex items-center space-x-2 text-white">
            <img
              src='https://companieslogo.com/img/orig/FPT.VN_BIG.D-b2da87b8.png?t=1722927800'
              className="w-11 object-cover"
            />
            <span className="text-xl font-bold text-white">FPT Admission</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-orange-200 transition-colors duration-200"
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
                      flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-white text-orange-700 shadow-lg transform scale-105'
                        : 'text-white hover:bg-white/10 hover:text-orange-200'
                      }
                    `}
                    onClick={() => onClose()}
                  >
                    <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-orange-700' : 'text-white'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-orange-500 bg-orange-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
              {user?.avata ? (
                <img
                  src={user.avata}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-lg font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user?.name || "Chưa đăng nhập"}</p>
              <p className="text-xs text-orange-200">{user?.email || "..."}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
