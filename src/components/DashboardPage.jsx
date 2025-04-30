import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSales } from '../features/sales/salesSlice';
import { fetchProducts } from '../features/products/productSlice';
import { selectAllSales, selectTotalRevenue } from '../features/sales/salesSelector';
import { selectAllProducts } from '../features/products/selector';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);
  const totalRevenue = useSelector(selectTotalRevenue);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSales());
  }, [dispatch]);

  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.quantity <= 10).length;

  const topProducts = {};
  sales.forEach(({ productId, quantity }) => {
    topProducts[productId] = (topProducts[productId] || 0) + quantity;
  });

  const topProductList = Object.entries(topProducts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, qty]) => {
      const product = products.find((p) => p.id === productId);
      return { name: product?.name || 'Unknown', quantity: qty };
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Business Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} color="green" icon="💰" />
        <KpiCard title="Total Products" value={totalProducts} color="blue" icon="📦" />
        <KpiCard title="Low Stock Items" value={lowStockCount} color="red" icon="⚠️" />
        <KpiCard title="Total Sales" value={sales.length} color="indigo" icon="🛒" />
      </div>

      {/* Top Products Section */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🏆 Top 5 Selling Products</h2>
        {topProductList.length === 0 ? (
          <p className="text-gray-500 text-sm">No sales yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {topProductList.map((p, index) => (
              <li key={index} className="flex justify-between py-2">
                <span className="text-gray-700 font-medium">
                  #{index + 1} {p.name}
                </span>
                <span className="text-gray-500 text-sm">{p.quantity} units sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// 💡 Reusable KPI Card
const KpiCard = ({ title, value, color, icon }) => {
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
