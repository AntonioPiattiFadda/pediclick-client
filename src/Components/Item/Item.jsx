import React, { useContext } from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

const Item = ({ element }) => {
  const { addToCart, getProductQuantityByID, minusOneElement, removeProduct } =
    useContext(CartContext);
  const initialValue = getProductQuantityByID(element.id);

  const handleAdd = () => {
    const newElement = { ...element, quantity: 1 };
    addToCart(newElement);
  };

  const handleMinus = (quantity) => {
    if (quantity === 1) {
      removeProduct(element.id);
      return;
    }
    minusOneElement(element.id);
  };
  return (
    <>
      {!element.blocked ? (
        <Link
          to={`/itemDetail/${element.id}`}
          style={{ textDecoration: 'none' }}
        >
          <div className={styles.cardContainer}>
            <div className={styles.cardInformation}>
              <div className={styles.cardInformationContent}>
                <span>{element.name}</span>
                <span>{element.description}</span>
                <span>${element.price}</span>
              </div>
            </div>
            <div className={styles.cardImageContainer}>
              {element.blocked && (
                <div className={styles.noStockOvelay}>
                  <span>No hay stock</span>
                </div>
              )}
              <img className={styles.cardImage} src={element.image} alt="" />
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.cardContainer}>
          <div className={styles.cardInformation}>
            <div className={styles.cardInformationContent}>
              <span>{element.name}</span>
              <span>{element.description}</span>
              <span>${element.price}</span>
            </div>
          </div>
          <div className={styles.cardImageContainer}>
            {element.blocked && (
              <div className={styles.noStockOvelay}>
                <span>No hay stock</span>
              </div>
            )}
            <img className={styles.cardImage} src={element.image} alt="" />
          </div>
        </div>
      )}

      <div className={styles.cardButton}>
        <ItemCount
          blocked={element.blocked}
          onMinus={handleMinus}
          onAdd={handleAdd}
          initial={initialValue || 0}
        />
      </div>
    </>
  );
};
export default Item;
