import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-info']}>
        <span>© 1999-2023 Order.Solutions.com.ar S.R.L.</span>
        <span>Argentina</span>
      </div>
    </footer>
  );
}

export default Footer;
