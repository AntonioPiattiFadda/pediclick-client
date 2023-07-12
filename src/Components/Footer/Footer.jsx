import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-links']}>
        <a href="#">Vender</a>
        <a href="#">Ayuda</a>
        <a href="#">Compra Protegida</a>
        <a href="#">Tiendas Oficiales</a>
        <a href="#">Publicidad</a>
        <a href="#">Descuentos Mercado Puntos</a>
        <a href="#">Crédito</a>
        <a href="#">Historial</a>
        <a href="#">Supermercado</a>
        <a href="#">Regalos</a>
        <a href="#">Contáctanos</a>
      </div>
      <div className={styles['footer-info']}>
        <span>© 1999-2023 Order.Solutions.com.ar S.R.L.</span>
        <span>Defensa 1098, CABA</span>
        <span>Argentina</span>
      </div>
    </footer>
  );
}

export default Footer;
