import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

const ItemDetail = ({ onMinus, onAdd, item, initialValue }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <span className={styles.cardName}>{item.name}</span>
        <img className={styles.cardImage} src={item.image} alt="" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <label>
            <input type="checkbox" name="tarea1" value="hecho" /> x200g
          </label>
        </div>
        <div className={styles.countAndPrice}> 
          <ItemCount onMinus={onMinus} onAdd={onAdd} initial={initialValue} />
          <span className={styles.price}>${item.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
