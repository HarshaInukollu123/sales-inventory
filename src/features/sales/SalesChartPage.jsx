import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from './salesSlice';
import { fetchProducts } from '../products/productSlice';
import {
  DailyRevenueChart,
  SalesByCategoryChart,
  TopSellingProductsChart,
} from './charts';

const SalesChartsPage = () => {
  const dispatch = useDispatch();
  const salesStatus = useSelector((state) => state.sales.status);
  const productsStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (salesStatus === 'idle') dispatch(fetchSales());
    if (productsStatus === 'idle') dispatch(fetchProducts());
  }, [dispatch, salesStatus, productsStatus]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Sales Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <DailyRevenueChart />
        <SalesByCategoryChart />
        <TopSellingProductsChart />
      </div>
    </div>
  );
};

export default SalesChartsPage;
