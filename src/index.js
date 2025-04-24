import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { makeServer } from './mock/server';
import ProductList from './features/products/ProductList';

// Start MirageJS server in development
if (typeof window !== 'undefined') {
  makeServer();
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <ProductList />
  </React.StrictMode>
  </Provider>
);


