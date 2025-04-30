import React, { useState, useEffect } from 'react';

const ProductFilters = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    onFilter({ search, category, minPrice, maxPrice });
  };

  useEffect(() => {
    onFilter({ search, category, minPrice, maxPrice });
  }, [search, category, minPrice, maxPrice, onFilter]);

  return (
    <div className="bg-white p-4 rounded shadow mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <input
        type="text"
        placeholder="🔍 Search by name..."
        className="border p-2 rounded w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleFilterChange();
        }}
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          handleFilterChange();
        }}
        className="border p-2 rounded w-full"
      >
        <option>All</option>
        <option>Electronics</option>
        <option>Clothing</option>
        <option>Accessories</option>
        <option>Home</option>
        <option>Books</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        className="border p-2 rounded w-full"
        value={minPrice}
        onChange={(e) => {
          setMinPrice(e.target.value);
          handleFilterChange();
        }}
      />

      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded w-full"
        value={maxPrice}
        onChange={(e) => {
          setMaxPrice(e.target.value);
          handleFilterChange();
        }}
      />
    </div>
  );
};

export default ProductFilters;
