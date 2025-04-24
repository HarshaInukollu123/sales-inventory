import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
} from './productSlice';
import {
  selectAllProducts,
  selectProductStatus,
  selectProductError,
} from './selector';

const categoryColors = {
  Electronics: 'bg-blue-100 text-blue-700',
  Clothing: 'bg-pink-100 text-pink-700',
  Accessories: 'bg-yellow-100 text-yellow-700',
  Home: 'bg-green-100 text-green-700',
  Books: 'bg-purple-100 text-purple-700',
};

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (status === 'loading') {
    return <div className="text-center text-lg mt-10">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Inventory</h1>
      <div className="overflow-x-auto rounded shadow border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${categoryColors[product.category]}`}
                  >
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
