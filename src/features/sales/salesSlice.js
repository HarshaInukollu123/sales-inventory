import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Sales
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await axios.get('/api/sales');
  return response.data;
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: [],
    totalRevenue: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sales = action.payload;
        state.totalRevenue = action.payload.reduce((sum, sale) => sum + sale.totalPrice, 0);
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
