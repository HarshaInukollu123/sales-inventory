import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectAllSales } from './salesSelector';
import { selectAllProducts } from '../products/selector';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const TopSellingProductsChart = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const productSales = {};

  sales.forEach(({ productId, quantity }) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    productSales[product.name] = (productSales[product.name] || 0) + quantity;
  });

  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const data = {
    labels: topProducts.map(([name]) => name),
    datasets: [
      {
        label: 'Units Sold',
        data: topProducts.map(([_, qty]) => qty),
        backgroundColor: '#F59E0B',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">🏆 Top Selling Products</h2>
      <Bar data={data} options={{ indexAxis: 'y' }} />
    </div>
  );
};

export default TopSellingProductsChart;
