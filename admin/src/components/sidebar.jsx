import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Add Product', path: '/addProduct' },
    { name: 'List Product', path: '/productlist' },
    { name: 'Order', path: '/orders' }
  ];

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className='w-64 bg-white border-r border-gray-200 shadow-sm'>
        <div className='p-4 sm:p-6 border-b border-gray-200'>
          <h1 className='font-bold text-lg sm:text-xl text-gray-800'>Admin Panel</h1>
        </div>
        
        <nav className='mt-4 sm:mt-6'>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 sm:px-6 py-3 text-gray-700 hover:bg-orange-50 transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' 
                      : ''
                  }`}
                >
                  <span className='font-medium text-sm sm:text-base'>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className='flex-1 bg-gray-50'>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;