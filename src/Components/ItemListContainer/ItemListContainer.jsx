import React, { useContext, useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';
import { getProducts } from '../../Services/products.service';
import { SearchContext } from '../Context/SearchContext';
import { ProductsSkeleton } from '../../Utils/Skeletons';

const transformProductsData = (data) => {
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.image,
    description: product.description,
    price: product.price,
    category: product.category.name,
    blocked: product.blocked,
  }));
};

const ItemListContainer = () => {
  const { searchString, searchedCategory } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        const mappedProducts = transformProductsData(res);

        
        let searchedProducts = [];
        if (searchString === '') {
          searchedProducts = mappedProducts;
        } else {
          searchedProducts = mappedProducts.filter((product) => {
            const productName = product.name.toLowerCase();
            const searchText = searchString.toLowerCase();
            return productName.includes(searchText);
          });
        }
        if (searchedCategory !== '') {
          const filteredProducts = searchedProducts.filter((product) => {
            return product.category === searchedCategory;
          });
          if (filteredProducts.length === 0) {
            setItems([]);
            setLoading(false);
            return;
          }
          setItems(filteredProducts);
          setLoading(false);
          return;
        }
        setItems(searchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [items, searchString]);

  return (
    <div className={styles.itemListContainer}>
      {/* <PromotionedProducts /> */}

      {!!loading ? (
        <>
          <span className={styles.ProductsTittle}>Agregar un skeleton</span>
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
