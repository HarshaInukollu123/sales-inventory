import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-yellow-200 ';

  return (
    <nav className="bg-indigo-600 shadow text-white z-50 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-shrink-0 text-2xl font-bold text-white">
        <Link to="/" className={`text-white ${isActive('/')}`}>
            Inventory App
          </Link>        </div>
        <div className="flex space-x-6">
          <Link to="/" className={`text-sm text-white ${isActive('/')}`}>
            Dashboard
          </Link>
          <Link to="/products" className={`text-sm text-white ${isActive('/products')}`}>
            Products
          </Link>
          <Link to="/analytics" className={`text-sm text-white ${isActive('/analytics')}`}>
            Analytics
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
