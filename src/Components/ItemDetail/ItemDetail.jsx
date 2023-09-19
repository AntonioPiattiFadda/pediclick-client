import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import styles from './ItemDetail.module.css';

const ItemDetail = ({ onMinus, onAdd, item, initialValue }) => {
  const unitPrice = item.unit_price;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <span className={styles.cardName}>{item.name}</span>
        <img className={styles.cardImage} src={item.image} alt="" />
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.infoContainer}>
          <div>
            <label>
              <input
                className={styles.checkBox}
                type="checkbox"
                name="tarea1"
                value="hecho"
              />{' '}
              X1
            </label>
          </div>
          <div className={styles.countAndPrice}>
            <ItemCount onMinus={onMinus} onAdd={onAdd} initial={initialValue} />
            <span className={styles.price}>${item.price}</span>
          </div>
        </div>
        {unitPrice
          ? unitPrice.map((price) => (
              <div key={price.id} className={styles.infoContainer}>
                <div>
                  <label>
                    <input
                      className={styles.checkBox}
                      type="checkbox"
                      name="tarea1"
                      value="hecho"
                    />{' '}
                    {price.name}
                  </label>
                </div>
                <div className={styles.countAndPrice}>
                  <ItemCount
                    onMinus={onMinus}
                    onAdd={onAdd}
                    initial={initialValue}
                  />
                  <span className={styles.price}>${price.value}</span>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ItemDetail;
