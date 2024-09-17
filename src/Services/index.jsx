import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cstqhybxydgcazbgjqrd.supabase.co';
const supabaseKey = process.env.REACT_APP_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllProducts = async () => {
  let { data: products, error } = await supabase.from('products').select(`
    *,
    unit_prices (
      *
    ),
    category_id (
      *
    )
  `);

  if (error) {
    throw new Error(error.message);
  }
  return products;
};

export const getCategories = async () => {
  let { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return categories;
};

export const getProductById = async (id) => {
  let { data: products, error } = await supabase
    .from('products')
    .select(
      `
        *,
        unit_prices (
          *
        )
      `
    )
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return products;
};

export const uploadImage = async (file) => {
  const { data, error } = await supabase.storage
    .from('PediClick-panarce')
    .upload(file.name, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
