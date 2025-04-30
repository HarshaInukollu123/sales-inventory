import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectAllSales } from './salesSelector';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const DailyRevenueChart = () => {
  const sales = useSelector(selectAllSales);

  const revenueByDate = {};
  sales.forEach(({ date, totalPrice }) => {
    const day = new Date(date).toLocaleDateString();
    revenueByDate[day] = (revenueByDate[day] || 0) + totalPrice;
  });

  const data = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: 'Revenue ($)',
        data: Object.values(revenueByDate),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">📅 Daily Revenue</h2>
      <Bar data={data} />
    </div>
  );
};

export default DailyRevenueChart;
