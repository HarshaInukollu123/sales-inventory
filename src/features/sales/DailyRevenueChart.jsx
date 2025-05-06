import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSales } from '../sales/salesSelector';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DailyRevenueChart = () => {
  const sales = useSelector(selectAllSales);

  const dailyRevenueData = useMemo(() => {
    const dateMap = {};

    sales.forEach(({ date, totalPrice }) => {
      const day = new Date(date).toISOString().split('T')[0];
      dateMap[day] = (dateMap[day] || 0) + totalPrice;
    });

    const sortedDates = Object.keys(dateMap).sort();
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Daily Revenue',
          data: sortedDates.map((d) => dateMap[d]),
          fill: true,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
        },
      ],
    };
  }, [sales]);

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">📆 Daily Revenue Trend</h2>
      <Line data={dailyRevenueData} />
    </div>
  );
};

export default DailyRevenueChart;
