import React from 'react';
import styles from './Footer.module.css';
import CompletarPedido from '../../assets/svg/CompletarPedido.svg';
import Carrito from '../../assets/svg/carrito.svg';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  if (location.pathname === '/cart') {
    return (
      <footer className={styles['footer-container']}>
        <div className={styles['footer-card']}>
          <div className={styles['footer-info']}>
            <img
              className={styles['footer-icon']}
              src={CompletarPedido}
              alt="Carrito"
            />
            <span>Completar pedido</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles['footer-container']}>
      <Link className={styles['footer-link']} to={'/cart'}>
        <div className={styles['footer-card']}>
          <div className={styles['footer-info']}>
            <img
              className={styles['footer-icon']}
              src={Carrito}
              alt="Carrito"
            />
            <span>Ir a tu carrito</span>
          </div>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
