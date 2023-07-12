import axios from 'axios';
import endPoints from './index';

const getProducts = async () => {
  const response = await axios.get(endPoints.products.getAllProduct);
  return response.data;
};
const getOneProduct = async (id) => {
  const response = await axios.get(endPoints.products.getProduct(id));
  return response.data;
};

export { getProducts, getOneProduct };
