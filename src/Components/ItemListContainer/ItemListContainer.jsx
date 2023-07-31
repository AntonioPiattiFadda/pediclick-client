import React, { useContext, useEffect, useState } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';
import { getProducts } from '../../Services/products.service';
import { SearchContext } from '../Context/SearchContext';
import PromotionedProducts from '../PromotionedProducts/PromotionedProducts';

const ItemListContainer = () => {
  const { searchString } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const mappedProducts = res.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            category: product.category.name,
            blocked: product.blocked,
          };
        });
        const categoriesList = mappedProducts.map((product) => {
          return product.category;
        });
        const arraySinRepetidos = Array.from(new Set(categoriesList));
        setCategories(arraySinRepetidos.sort());
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
        setItems(
          searchedProducts.sort((a, b) => {
            return a.category.localeCompare(b.category);
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [items, searchString]);

  return (
    <div className={styles.itemListContainer}>
      <PromotionedProducts />

      {!!loading ? (
        <h1>Cargando...</h1>
      ) : (
        // <ProductsSkeleton color="#36d7b7" />
        <>
          {categories.map((category) => {
            const elements = items.filter((element) => {
              return element.category === category;
            });
            return (
              <ItemList key={category} category={category} items={elements} />
            );
          })}
        </>
      )}
      <span style={{ height: '35px' }}></span>
    </div>
  );
};

export default ItemListContainer;
