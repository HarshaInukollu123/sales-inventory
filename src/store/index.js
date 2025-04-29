import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';
import salesReducer from "../features/sales/salesSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sales: salesReducer,
  },
});
