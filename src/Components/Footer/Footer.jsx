import React from 'react';
import styles from './Footer.module.css';
import Carrito from '../../assets/svg/carrito.svg';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-card']}>
        <div className={styles['footer-info']}>
          <img className={styles['footer-icon']} src={Carrito} alt="Carrito" />
          <span>Ir a tu carrito</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
