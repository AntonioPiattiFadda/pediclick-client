import React from 'react';
import styles from './EmptyCart.module.css';
import PromotionedProducts from '../PromotionedProducts/PromotionedProducts';

const EmptyCart = () => {
  return (
    <>
      <div className={styles.emptyCartContainer}>
        <h2 className={styles.emptyCartMessage}>Tu carrito esta vacío!</h2>
        <span>Puedes ver algunos de los productos que tenemos para ti</span>
      </div>
      <PromotionedProducts />
    </>
  );
};

export default EmptyCart;
