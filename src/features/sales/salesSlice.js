import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Fetch Sales
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await axios.get('/api/sales');
  return response.data.sales; // ✅ FIXED: correct key
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

        // ✅ Protect against unexpected null/undefined values
        state.totalRevenue = Array.isArray(action.payload)
          ? action.payload.reduce((sum, sale) => sum + sale.totalPrice, 0)
          : 0;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default salesSlice.reducer;
