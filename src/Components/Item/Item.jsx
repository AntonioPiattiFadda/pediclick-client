import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';

const Item = ({ element }) => {
  return (
    <>
      <Link
        className={styles.cardContainer}
        to={element.blocked ? undefined : `/itemDetail/${element.id}`}
      >
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{element.name}</span>
          <span className={styles.cardPrice}>
            {' '}
            <span className={styles.cardFrom}>desde</span>${element.price}
          </span>
        </div>
        {element.blocked && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: ' 100%',
              zIndex: '1200',
            }}
          >
            <div className={styles.noStockOvelay}></div>
            <span className={styles.noStockSpan}>sin stock disponible</span>
          </div>
        )}
        <img className={styles.cardImage} src={element.image} alt="" />
      </Link>
    </>
  );
};
export default Item;
