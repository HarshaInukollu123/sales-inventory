import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, selectProductStatus } from './selector';
import { fetchProducts } from './productSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);

  // 👉 Fetch products again if needed
  useEffect(() => {
    if (status === 'idle' || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, status, products.length]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Number of Products',
        data: Object.values(categoryCounts),
        backgroundColor: [
          '#60A5FA', // blue
          '#F472B6', // pink
          '#FACC15', // yellow
          '#4ADE80', // green
          '#A78BFA', // purple
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (status === 'loading') {
    return <div className="text-center text-lg mt-10">Loading Chart...</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Product Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Analytics;
