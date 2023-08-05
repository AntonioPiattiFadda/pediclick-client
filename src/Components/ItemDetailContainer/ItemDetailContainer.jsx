import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import styles from './ItemDetailContainer.module.css';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getOneProduct } from '../../Services/products.service';
import { ToastContainer, toast } from 'react-toastify';
import { DetailProductsSkeleton } from '../../Utils/Skeletons';

import 'react-toastify/dist/ReactToastify.css';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart, getProductQuantityByID, minusOneElement, removeProduct } =
    useContext(CartContext);
  const [item, setItem] = useState({});
  const initialValue = getProductQuantityByID(item.id);
  const [dobbuncer, setDebbouncer] = useState(false);

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
      toast.info(`Eliminaste ${item.name} de tu carrito!`, {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    minusOneElement(item.id);
  };

  const onAdd = (toastAdd) => {
    const selectedProduct = {
      ...item,
      quantity: 1,
    };
    addToCart(selectedProduct);
    if (dobbuncer) {
      return;
    }
    setDebbouncer(true);
    setTimeout(() => {
      toastAdd(item.name);
      setDebbouncer(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      {Object.entries(item).length === 0 ? (
        <DetailProductsSkeleton />
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
