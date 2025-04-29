import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold text-blue-700">
            InventoryApp
          </div>
          <div className="flex space-x-6">
            <Link to="/" className={`text-sm ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/products" className={`text-sm ${isActive('/products')}`}>
              Products
            </Link>
            <Link to="/analytics" className={`text-sm ${isActive('/analytics')}`}>
              Analytics
            </Link>
            <Link to="/sales" className={`text-sm ${isActive('/sales')}`}>
              Sales
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
