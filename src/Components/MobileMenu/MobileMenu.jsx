import React from 'react';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ openMenu }) => {
  return (
    <>
      {/* <div className={openMenu ? styles.MobileMenu : styles.MobileMenuClosed}>
        <ul>
          <div>
            <li>
              <img
                className={styles.MobileMenuIcons}
                width="24"
                height="24"
                src="https://img.icons8.com/material-rounded/24/home.png"
                alt="home"
              />
              <a href="/">Inicio</a>
            </li>
            <li>
              <img
                className={styles.MobileMenuIcons}
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/google-maps-new.png"
                alt="google-maps-new"
              />
              <a href="/">Ubicacion</a>
            </li>
            <li>
              <img
                className={styles.MobileMenuIcons}
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/instagram-new.png"
                alt="instagram-new"
              />
              <a href="/">Instagram</a>
            </li>
            <li>
              <img
                className={styles.MobileMenuIcons}
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/clock--v1.png"
                alt="clock--v1"
              />
              <a href="/">Horarios</a>
            </li>
            <li>
              <img
                className={styles.MobileMenuIcons}
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/instagram-new.png"
                alt="instagram-new"
              />
              <a href="/">Contacto</a>
            </li>
          </div>
          <li>
            <img
              className={styles.MobileMenuIcons}
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/24/happy--v1.png"
              alt="happy--v1"
            />
            <a href="/">Me encantó la pagina! La quiero para mi negocio!</a>
          </li>
        </ul>
      </div> */}
      {/* <div
        className={openMenu ?  styles['MobileMenu-overlay'] : styles.MobileMenuClosed}
       ></div> */}
    </>
  );
};

export default MobileMenu;
