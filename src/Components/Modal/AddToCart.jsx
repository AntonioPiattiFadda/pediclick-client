import React from 'react';
import styles from './AddToCart.module.css';
import AgregarAlCarritoTilde from '../../assets/svg/AgregarAlCarritoTilde.svg';

const AddToCartModal = () => {
  return (
    <div className={styles.container}>
      <img
        src={AgregarAlCarritoTilde}
        alt="Icono de exito al agregar al carrito"
      />
      <div className={styles.rigthInfo}>
        <p>Añadiste un nuevo producto al carrito.</p>
        <span>Haz click en “ir a tu pedido” para continuar.</span>
      </div>
    </div>
  );
};

export default AddToCartModal;
