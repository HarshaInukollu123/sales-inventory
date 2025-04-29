import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordSale } from './salesSlice';
import { selectAllProducts } from '../products/selector';
import { updateProduct } from '../products/productSlice';
import RevenueCard from '../sales/RevenueCard';
import RecentSalesTable from '../sales/RecentSalesTable';

const SalesForm = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantitySold, setQuantitySold] = useState(1);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    if (quantitySold > selectedProduct.quantity) {
      alert('⚠️ Not enough stock available!');
      return;
    }

    const fixedPrice = selectedProduct.price; // Keep price as fixed
    const fixedQuantity = Math.round(quantitySold); // Only whole number sales
    const totalPrice = fixedPrice * fixedQuantity;

    const saleRecord = {
      id: Date.now().toString(),
      productId: selectedProductId,
      quantity: fixedQuantity,
      totalPrice,
      date: new Date().toISOString(),
    };

    dispatch(recordSale(saleRecord));

    // Update product quantity in Redux inventory
    dispatch(updateProduct({
      ...selectedProduct,
      quantity: selectedProduct.quantity - fixedQuantity,
    }));

    // Reset form
    setSelectedProductId('');
    setQuantitySold(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-lg mx-auto mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🛒 Record New Sale</h2>

      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — (${p.price}) — Stock: {p.quantity}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={quantitySold}
        min="1"
        max={selectedProduct?.quantity || 100}
        onChange={(e) => setQuantitySold(Math.round(Number(e.target.value)))}
        className="w-full p-2 border rounded mb-4"
        placeholder="Quantity Sold"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
      >
        Record Sale
      </button>
    </form>
  );
};

export default SalesForm;
