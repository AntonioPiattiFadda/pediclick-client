import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

const ItemDetail = ({ onMinus, onAdd, item, initialValue }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.cardImage} src={item.image} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.cardTitle}>{item.name}</h1>
        <span className={styles.cardDescription}>{item.description}</span>
        <div span className={styles.priceContainer}>
          <span className={styles.price}>${item.price}</span>
          <ItemCount onMinus={onMinus} onAdd={onAdd} initial={initialValue} />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
