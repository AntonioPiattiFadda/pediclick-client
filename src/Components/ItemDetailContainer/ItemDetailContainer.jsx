import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import styles from './ItemDetailContainer.module.css';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getOneProduct } from '../../Services/products.service';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart, getProductQuantityByID, minusOneElement, removeProduct } =
    useContext(CartContext);

  const [item, setItem] = useState({});
  const initialValue = getProductQuantityByID(item.id);

  useEffect(() => {
    getOneProduct(id)
      .then((res) => {
        setItem(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onMinus = (quantity) => {
    if (quantity === 1) {
      removeProduct(item.id);
      return;
    }
    minusOneElement(item.id);
  };

  const onAdd = () => {
    const selectedProduct = {
      ...item,
      quantity: 1,
    };
    addToCart(selectedProduct);
  };

  return (
    <div className={styles.container}>
      {Object.entries(item).length === 0 ? (
        <h1>Cargando</h1>
      ) : (
        <ItemDetail
          onMinus={onMinus}
          onAdd={onAdd}
          item={item}
          initialValue={initialValue}
        />
      )}
    </div>
  );
};

export default ItemDetailContainer;
