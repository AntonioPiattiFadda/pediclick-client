import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-info']}>
        <img src="" alt="Carrito" />
        <span>Ir a tu carrito</span>
      </div>
    </footer>
  );
}

export default Footer;
