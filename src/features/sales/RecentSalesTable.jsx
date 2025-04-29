import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllSales } from './salesSelector';
import { selectAllProducts } from '../products/selector';

const RecentSalesTable = () => {
  const sales = useSelector(selectAllSales);
  const products = useSelector(selectAllProducts);

  const recentSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  const getProductName = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || 'Unknown';
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🧾 Recent Sales</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="px-4 py-2">{getProductName(sale.productId)}</td>
                <td className="px-4 py-2">{sale.quantity}</td>
                <td className="px-4 py-2">${sale.totalPrice}</td>
                <td className="px-4 py-2">{new Date(sale.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {recentSales.length === 0 && (
              <tr>
                <td className="px-4 py-2 text-center" colSpan="4">No sales recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSalesTable;
