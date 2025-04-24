import axios from 'axios';

export const fetchProductsAPI = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};
