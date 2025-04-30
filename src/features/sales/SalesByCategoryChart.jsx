import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectAllSales } from './salesSelector';
import { selectAllProducts } from '../products/selector';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByCategoryChart = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const categoryTotals = {};

  sales.forEach(({ productId, totalPrice }) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    categoryTotals[product.category] = (categoryTotals[product.category] || 0) + totalPrice;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#60A5FA', '#F87171', '#34D399', '#FBBF24', '#A78BFA'],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">📂 Revenue by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default SalesByCategoryChart;
