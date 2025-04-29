import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../products/productSlice';
import { fetchSales } from './salesSlice';
import RevenueCard from './RevenueCard';
import RecentSalesTable from './RecentSalesTable';

const SalesPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); // Load products first
    dispatch(fetchSales()); // Load sales
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📈 Sales Dashboard</h1>
      <RevenueCard />
      <RecentSalesTable />
    </div>
  );
};

export default SalesPage;
