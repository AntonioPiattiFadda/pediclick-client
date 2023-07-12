import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

const ItemDetail = ({ onAdd, item, initialValue }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img className={styles.cardImage} src={item.image} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.cardTitle}>{item.name}</h1>
        <span>{item.description}</span>
        <span className={styles.price}>${item.price}</span>
        <ItemCount
          onAdd={onAdd}
          // stock={item.stock}
          initialValue={initialValue}
        />
      </div>
    </div>
  );
};

export default ItemDetail;
