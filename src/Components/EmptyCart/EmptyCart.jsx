import React from 'react';
import styles from './EmptyCart.module.css';
import EmptyCartIcon from '../../assets/svg/EmptyCartIcon.svg';

const EmptyCart = () => {
  return (
    <>
      <div className={styles.emptycart_container}>
        <img
          src={EmptyCartIcon}
          alt="Lupa que indica que no haz encotrado el producto"
        />
        <h2 className={styles.emptycart_title}>Aún no hay pedidos</h2>
        <span className={styles.emptycart_subtitle}>
          Selecciona un producto y <br></br> luego elije la cantidad.
        </span>
      </div>
    </>
  );
};

export default EmptyCart;
