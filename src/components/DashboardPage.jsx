import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../features/sales/salesSlice';
import { fetchProducts } from '../features/products/productSlice';
import { selectAllSales } from '../features/sales/salesSelector';
import { selectAllProducts } from '../features/products/selector';
import SalesChartsPage from '../features/sales/SalesChartPage';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchProducts());
  }, [dispatch]);

  const totalRevenue = useMemo(() => {
    return sales.reduce((acc, sale) => acc + sale.totalPrice, 0);
  }, [sales]);

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.quantity <= 10).length;
  }, [products]);

  const topProducts = useMemo(() => {
    const countMap = {};
    sales.forEach(({ productId, quantity }) => {
      const id = String(productId);
      countMap[id] = (countMap[id] || 0) + quantity;
    });
    return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([productId, qty]) => {
        const product = products.find((p) => String(p.id) === productId);
        return {
          name: product?.name || `Product #${productId}`,
          quantity: qty,
        };
      });
  }, [sales, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Business Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <KpiCard icon="💰" title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} color="green" />
        <KpiCard icon="📦" title="Total Products" value={products.length} color="blue" />
        <KpiCard icon="⚠️" title="Low Stock Items" value={lowStockCount} color="red" />
        <KpiCard icon="🧾" title="Total Sales" value={sales.length} color="indigo" />
      </div>

      <div className="mt-10">
        <SalesChartsPage />
      </div>
      
      {/* Top Selling Products List */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🏆 Top 10 Selling Products</h2>
        <ul className="divide-y divide-gray-200">
          {topProducts.map((p, index) => (
            <li key={index} className="flex justify-between py-2">
              <span className="text-gray-700 font-medium">#{index + 1} {p.name}</span>
              <span className="text-gray-500 text-sm">{p.quantity} units sold</span>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};

const KpiCard = ({ icon, title, value, color }) => {
  const borderColor = {
    green: 'border-green-500',
    blue: 'border-blue-500',
    red: 'border-red-500',
    indigo: 'border-indigo-500',
  }[color];

  const textColor = {
    green: 'text-green-700',
    blue: 'text-blue-700',
    red: 'text-red-700',
    indigo: 'text-indigo-700',
  }[color];

  return (
    <div className={`bg-white p-5 rounded shadow border-t-4 ${borderColor}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-gray-600">{title}</p>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default DashboardPage;
