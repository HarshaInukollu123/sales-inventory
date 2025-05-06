import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllSales } from '../sales/salesSelector';
import { selectAllProducts } from '../products/selector';
import { Doughnut } from 'react-chartjs-2';

const SalesByCategoryChart = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const categoryRevenueData = useMemo(() => {
    const categoryMap = {};

    sales.forEach(({ productId, totalPrice }) => {
        const product = products.find((p) => String(p.id) === String(productId));
        if (!product) return;
      categoryMap[product.category] = (categoryMap[product.category] || 0) + totalPrice;
    });

    const labels = Object.keys(categoryMap);
    const values = labels.map((key) => categoryMap[key]);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue by Category',
          data: values,
          backgroundColor: [
            '#3b82f6',
            '#ec4899',
            '#f59e0b',
            '#10b981',
            '#8b5cf6',
          ],
        },
      ],
    };
  }, [sales, products]);

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4"> Revenue by Category</h2>
      <Doughnut data={categoryRevenueData} />
    </div>
  );
};

export default SalesByCategoryChart;
