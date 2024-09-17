import React, { useContext, useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';
import { SearchContext } from '../Context/SearchContext';
import { ProductsSkeleton } from '../../Utils/Skeletons';
import NotFound from '../NotFound/NotFound';
import { getAllProducts } from '../../Services';

const transformProductsData = (data) => {
  const productsWithUnitPrice = data.filter((product) => {
    return product.unit_prices.length > 0;
  });

  return productsWithUnitPrice.map((product) => ({
    id: product.id,
    name: product.product_name,
    image: product.image,
    description: product.description,
    category: product.category_id.name,
    unit_price: product.unit_prices,
  }));
};

const filterProducts = (products, searchString, searchedCategory) => {
  let filteredProducts = products;

  if (searchString) {
    const searchText = searchString.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchText)
    );
  }

  if (searchedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === searchedCategory
    );
  }

  return filteredProducts;
};

const ItemListContainer = () => {
  const { searchString, searchedCategory } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setLoading(true);

        const mappedProducts = transformProductsData(res);
        const filteredProducts = filterProducts(
          mappedProducts,
          searchString,
          searchedCategory
        );
        if (filteredProducts.length === 0) {
          setItems([]);
          setLoading(false);
        } else {
          setItems(filteredProducts);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        console.error(error);
      });
  }, [searchString, searchedCategory]);

  if (items.length === 0 && searchString !== '') {
    return <NotFound />;
  }

  return (
    <div className={styles.itemListContainer}>
      {!!loading ? (
        <>
          <ProductsSkeleton color="#36d7b7" />
        </>
      ) : (
        <>
          <ItemList items={items} />
        </>
      )}
    </div>
  );
};

export default ItemListContainer;
