import React from 'react';
import styles from './ItemDetail.module.css';
import UnitPrice from '../UnitPrice/UnitPrice';

const ItemDetail = ({ item, cart }) => {
  const unitPrices = item.unit_prices;
  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.imgContainer}>
          <span className={styles.cardName}>{item.product_name}</span>
          <img className={styles.cardImage} src={item.image} alt="" />
        </div>
        <p className={styles.cardDescription}>{item.description}</p>
      </div>
      <div className={styles.priceContainer}>
        {/* <span>{item.price}</span> */}
        {unitPrices
          ? unitPrices.map((unitPrice) => (
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
