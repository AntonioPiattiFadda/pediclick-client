import React from 'react';
import styles from './ItemDetail.module.css';
import UnitPrice from '../UnitPrice/UnitPrice';

const ItemDetail = ({ item, cart }) => {
  const unitPrice = item.unit_price;

  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.imgContainer}>
          <span className={styles.cardName}>{item.name}</span>
          <img className={styles.cardImage} src={item.image} alt="" />
        </div>
        <p className={styles.cardDescription}>{item.description}</p>
      </div>
      <div className={styles.priceContainer}>
        {unitPrice
          ? unitPrice.map((unitPrice) => (
              <UnitPrice
                item={item}
                cart={cart}
                unitPrice={unitPrice}
                key={unitPrice.id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ItemDetail;
