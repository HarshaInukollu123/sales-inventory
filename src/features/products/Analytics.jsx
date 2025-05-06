import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from './selector';
import { selectAllSales } from '../sales/salesSelector';
import ReportExport from '../../components/ReportExcel';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AnalyticsPage = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const enrichedSales = useMemo(
    () =>
      sales.map((sale) => {
        const product = products.find((p) => String(p.id) === String(sale.productId));
        return {
          ...sale,
          productName: product?.name || `#${sale.productId}`,
          category: product?.category || 'Unknown',
        };
      }),
    [sales, products]
  );

  // Group revenue by month
  const monthlyRevenueData = useMemo(() => {
    const monthMap = {};
    enrichedSales.forEach(({ date, totalPrice }) => {
      const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthMap[month] = (monthMap[month] || 0) + totalPrice;
    });

    const labels = Object.keys(monthMap);
    const data = labels.map((m) => monthMap[m]);

    return {
      labels,
      datasets: [
        {
          label: 'Monthly Revenue',
          data,
          backgroundColor: 'rgba(59,130,246,0.6)',
        },
      ],
    };
  }, [enrichedSales]);

  // Category growth over time (cumulative revenue)
  const categoryGrowthData = useMemo(() => {
    const map = {};
    enrichedSales.forEach(({ date, totalPrice, category }) => {
      const key = new Date(date).toISOString().split('T')[0];
      if (!map[category]) map[category] = {};
      map[category][key] = (map[category][key] || 0) + totalPrice;
    });

    const allDates = Array.from(new Set(enrichedSales.map(s => new Date(s.date).toISOString().split('T')[0]))).sort();

    return {
      labels: allDates,
      datasets: Object.entries(map).map(([cat, values]) => ({
        label: cat,
        data: allDates.map(date => values[date] || 0),
        fill: true,
      })),
    };
  }, [enrichedSales]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(enrichedSales.length / itemsPerPage);
  const currentData = enrichedSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Advanced Analytics</h1>

      <ReportExport
        data={enrichedSales}
        columns={['productName', 'category', 'quantity', 'totalPrice', 'date'].map(key => ({ key, label: key }))}
        filename="AdvancedAnalyticsReport"
        type="sales"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📈 Monthly Revenue</h2>
          <Bar data={monthlyRevenueData} />
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📊 Category Growth Over Time</h2>
          <Line data={categoryGrowthData} />
        </div>
      </div>

      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Sales Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-left uppercase sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total ($)</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentData.map((s, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{s.productName}</td>
                  <td className="px-4 py-2">{s.category}</td>
                  <td className="px-4 py-2">{s.quantity}</td>
                  <td className="px-4 py-2">${s.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(s.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center gap-4 mt-4">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
            Prev
          </button>
          <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
