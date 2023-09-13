import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';

const Item = ({ element }) => {
  return (
    <>
      <Link
        className={styles.cardContainer}
        disabled={element.blocked}
        to={`/itemDetail/${element.id}`}
      >
        <span className={styles.cardName}>{element.name}</span>
        <span className={styles.cardPrice}>${element.price}</span>c
        {/* {element.blocked && (
              <div className={styles.noStockOvelay}>
                <span>No hay stock</span>
              </div>
            )} */}
        <img className={styles.cardImage} src={element.image} alt="" />
      </Link>
    </>
  );
};
export default Item;
