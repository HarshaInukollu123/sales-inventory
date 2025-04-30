import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './features/products/ProductList';
import Navbar from './components/Navbar';
import Analytics from './features/products/Analytics';
import SalesChartsPage from './features/sales/SalesChartPage';

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sales" element={<SalesChartsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
