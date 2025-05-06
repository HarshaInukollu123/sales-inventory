import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSales } from '../sales/salesSelector';
import { selectAllProducts } from '../products/selector';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const TopSellingProductsChart = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const chartData = useMemo(() => {
    const salesMap = {};

    sales.forEach(({ productId, quantity }) => {
      salesMap[productId] = (salesMap[productId] || 0) + quantity;
    });

    const ranked = Object.entries(salesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([productId, qty]) => {
        const product = products.find((p) => String(p.id) === String(productId));
        return {
          name: product?.name || `Product ${productId}`,
          quantity: qty,
        };
      });

    return {
      labels: ranked.map((r) => r.name),
      datasets: [
        {
          label: 'Units Sold',
          data: ranked.map((r) => r.quantity),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
        },
      ],
    };
  }, [sales, products]);

  return (
    <div className="bg-white rounded shadow p-6 md:col-span-2">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">🏆 Top 5 Selling Products</h2>
      <Bar data={chartData} options={{ indexAxis: 'y' }} />
    </div>
  );
};

export default TopSellingProductsChart;
