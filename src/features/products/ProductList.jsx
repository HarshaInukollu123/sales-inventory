import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from './productSlice';
import {
  selectAllProducts,
  selectProductStatus,
  selectProductError,
} from './selector';
import ProductForm from './productForm';
import Modal from '../../components/Modal';
import ProductFilters from './ProductFilters';
import ReportExport from '../../components/ReportExcel';

const categoryColors = {
  Electronics: 'bg-blue-100 text-blue-700',
  Clothing: 'bg-pink-100 text-pink-700',
  Accessories: 'bg-yellow-100 text-yellow-700',
  Home: 'bg-green-100 text-green-700',
  Books: 'bg-purple-100 text-purple-700',
};

const productColumns = [
  { key: 'name', label: 'Product Name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price ($)' },
  { key: 'quantity', label: 'Stock Qty' },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setFiltered(products);
    setCurrentPage(1);
  }, [products]);

  const applyFilters = useCallback(
    ({ search, category, minPrice, maxPrice }) => {
      let result = [...products];

      if (search)
        result = result.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );

      if (category !== 'All')
        result = result.filter((p) => p.category === category);

      if (minPrice)
        result = result.filter((p) => p.price >= parseFloat(minPrice));

      if (maxPrice)
        result = result.filter((p) => p.price <= parseFloat(maxPrice));

      setFiltered(result);
      setCurrentPage(1);
    },
    [products]
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSave = (product) => {
    if (editingProduct) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    setIsModalOpen(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (status === 'loading') {
    return <div className="text-center text-lg mt-10">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">📦 Product Inventory</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          ➕ Add Product
        </button>
      </div>

      <ReportExport
        data={filtered}
        columns={productColumns}
        filename="ProductInventoryReport"
        type="product"
      />

      <ProductFilters onFilter={applyFilters} />

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
            {currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${categoryColors[product.category]}`}
                  >
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4 space-x-3">
                  <button
                    onClick={() => openEditModal(product)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ◀️ Prev
          </button>
          <span className="px-4 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next ▶️
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ProductForm
            onSave={handleSave}
            onCancel={() => setIsModalOpen(false)}
            initialData={editingProduct}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
