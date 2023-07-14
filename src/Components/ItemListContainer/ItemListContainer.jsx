import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';
import { getProducts } from '../../Services/products.service';

const ItemListContainer = () => {
  const { categoryName, searchedItem } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   const itemCollection = collection(db, 'products');
  //   let consulta = undefined;

  //   if (categoryName) {
  //     const q = query(
  //       itemCollection,
  //       where('category', '==', `${categoryName}`)
  //     );
  //     consulta = getDocs(q);
  //   } else if (searchedItem) {
  //     const searchedItemLowerCase = searchedItem.toLowerCase();
  //     const q = query(
  //       itemCollection,
  //       where('title', '>=', `${searchedItemLowerCase}`),
  //       where('title', '<=', `${searchedItemLowerCase}\uf8ff`)
  //     );
  //     consulta = getDocs(q);
  //   } else {
  //     consulta = getDocs(itemCollection);
  //   }
  //   consulta.then((res) => {
  //     let products = res.docs.map((element) => {
  //       return {
  //         ...element.data(),
  //         id: element.id,
  //       };
  //     });
  //     setItems(products);
  //     setLoading(false);
  //   });
  // }, [categoryName, searchedItem]);

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
        setItems(mappedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [items]);

  return (
    <div className={styles.itemListContainer}>
      {!!loading ? (
        <h1>Cargando...</h1>
      ) : (
        // <ProductsSkeleton color="#36d7b7" />
        <ItemList items={items} />
      )}
      <span style={{ height: '40px' }}></span>
    </div>
  );
};

export default ItemListContainer;
