import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import styles from './ItemDetailContainer.module.css';
import Swal from 'sweetalert2';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getOneProduct } from '../../Services/products.service';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart, cart, getProductQuantityByID } = useContext(CartContext);

  const [item, setItem] = useState({});

  useEffect(() => {
    getOneProduct(id)
      .then((res) => {
        setItem(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const onAdd = (contador) => {
    const selectedProduct = {
      ...item,
      quantity: contador,
    };
    const duplicado = cart.some(
      (producto) => cart.title === selectedProduct.title
    );
    addToCart(selectedProduct);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Has añadido ${contador} ${item.name}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const initialValue = getProductQuantityByID(item.id);

  return (
    <div className={styles.container}>
      <ItemDetail onAdd={onAdd} item={item} initialValue={initialValue} />
    </div>
  );
};

export default ItemDetailContainer;
