import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export const getAllProducts = async () => {
  const { data: products, error } = await supabase.from("products").select(`
    id,
name,
description,
slug,
status,
category_id,

      product_images(
      url,
      sort_order  ),
      product_prices(
      quantity,
      units(
      name,
      symbol),
      price,
      currency

      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  return { products, error };
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
