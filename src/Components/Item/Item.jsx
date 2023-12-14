import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';

const Item = ({ element }) => {
  const bestPrice = element.unit_price.reduce((minPrice, currentPrice) => {
    return currentPrice.value < minPrice.value ? currentPrice : minPrice;
  }, element.unit_price[0]);

  const minValue = bestPrice.value;

  const noStockAtAll = element.unit_price.every(
    (price) => price.blocked === true
  );

  return (
    <>
      <Link
        className={styles.cardContainer}
        to={noStockAtAll ? undefined : `/itemDetail/${element.id}`}
      >
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{element.name}</span>
          <span className={styles.cardPrice}>
            {' '}
            <span className={styles.cardFrom}>desde</span>${minValue}
          </span>
        </div>
        {noStockAtAll && (
          <div className={styles.noStockOvelayContainer}>
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
