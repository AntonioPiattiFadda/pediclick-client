import React from 'react';
import styles from './MobileMenu.module.css';

const MobileMenu = () => {
  return (
    <>
      <div className={styles.MobileMenu}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>Categirias</li>
          <li>Quieres esta tienda para tu local?</li>
        </ul>
      </div>
      <div className={styles['MobileMenu-overlay']}></div>
    </>
  );
};

export default MobileMenu;
