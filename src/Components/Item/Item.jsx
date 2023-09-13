import React, { useContext, useState } from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom-toast.css';

const Item = ({ element }) => {
  const { addToCart, getProductQuantityByID, minusOneElement, removeProduct } =
    useContext(CartContext);
  const initialValue = getProductQuantityByID(element.id);
  const [dobbuncer, setDebbouncer] = useState(false);

  const handleAdd = (toastAdd) => {
    const newElement = { ...element, quantity: 1 };
    addToCart(newElement);
    if (dobbuncer) {
      return;
    }
    setDebbouncer(true);
    setTimeout(() => {
      toastAdd(element.name);
      setDebbouncer(false);
    }, 1000);
  };

  const handleMinus = (quantity) => {
    if (quantity === 1) {
      removeProduct(element.id);
      toast.info(`Eliminaste ${element.name} de tu carrito!`, {
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
    minusOneElement(element.id);
  };
  return (
    <>
      <Link
        disabled={element.blocked}
        to={`/itemDetail/${element.id}`}
        style={{ textDecoration: 'none', width: 'calc(50vw - 15px)' }}
      >
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
        <div className={styles.cardContainer}>
          <span className={styles.cardName}>{element.name}</span>
          <span className={styles.cardPrice}>${element.price}</span>c
          <div className={styles.cardImageContainer}>
            {/* {element.blocked && (
              <div className={styles.noStockOvelay}>
                <span>No hay stock</span>
              </div>
            )} */}
            <img className={styles.cardImage} src={element.image} alt="" />
          </div>
        </div>
      </Link>
    </>
  );
};
export default Item;
