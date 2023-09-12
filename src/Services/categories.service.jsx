import axios from 'axios';
import endPoints from './index';

const getCategories = async () => {
  const response = await axios.get(endPoints.categories.getCategoriesList);
  return response.data;
};
const getAllCategoriesItems = async () => {
  const response = await axios.get(endPoints.categories.getAllCategoryItems);
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(endPoints.categories.getCategory(id));
  return response.data;
};

export { getCategories, getAllCategoriesItems, getCategory };
