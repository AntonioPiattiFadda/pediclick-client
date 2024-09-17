import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import styles from './ItemDetailContainer.module.css';
import ItemDetail from '../ItemDetail/ItemDetail';
import { DetailProductsSkeleton } from '../../Utils/Skeletons';
import 'react-toastify/dist/ReactToastify.css';
import { getProductById } from '../../Services';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addUnitPriceToProduct, Cart } = useContext(CartContext);
  const [item, setItem] = useState({});

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setItem(res[0]);
      })
      .catch((error) => {
        console.error('Error al cargar el producto', error);
      });
  }, [id, Cart]);

  return (
    <div className={styles.container}>
      {Object.entries(item).length === 0 ? (
        <DetailProductsSkeleton />
      ) : (
        <ItemDetail item={item} addUnitPriceToProduct={addUnitPriceToProduct} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
