import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded shadow-md max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sales & Inventory Tracker</h1>
        <p className="text-gray-600 mb-6">Manage your products, monitor inventory, and track sales effortlessly.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Go to Product Inventory
        </button>
      </div>
    </div>
  );
};

export default Home;
