import React, { useState, useEffect } from 'react';

const categories = ['Electronics', 'Clothing', 'Accessories', 'Home', 'Books'];

const ProductForm = ({ onSave, initialData = null, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      id: initialData?.id || Date.now().toString(), // Use timestamp as mock ID
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow max-w-lg w-full mx-auto">
      <h2 className="text-lg font-semibold">{initialData ? 'Edit' : 'Add'} Product</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initialData ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
