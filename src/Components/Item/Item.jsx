import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';

const Item = ({ element }) => {
  //FIXME - Me tengo que asegurar que todos los productos tengan unitPrice

  // const bestPrice = element.unit_price.map((UnitPrice) => {
  //   return UnitPrice.value;
  // });
  // console.log(bestPrice);

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
