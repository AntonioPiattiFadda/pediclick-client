import CartWidget from '../CartWidget/CartWidget';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useLocation } from 'react-router-dom';
import Hamburguer from '../../assets/svg/hamburger.svg';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navStyle = {
    marginBottom: '-15px',
  };

  return (
    <div
      className={
        openMenu ? styles.navbar__container : styles.navbar__container_sticky
      }
    >
      <MobileMenu openMenu={openMenu} />

      <div style={isHome ? navStyle : {}} className={styles.navbar__firstLine}>
        {/* //NOTE - Prmer componente */}
        <div className={styles.navbar__menuMobile}>
          <img
            className={styles.navbar__menuMobile_icon}
            onClick={handleOpenMenu}
            src={Hamburguer}
            alt="Icono de menu"
          />
        </div>

        {/* //NOTE - Segundo componente */}
        <div className={styles.navbar__logo_container}>
          <div className={styles.navbar__logo}>
            <a href="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8nWPb3DyHkw5qoJBwFH-xJzpVRhUNL8zdJUM-nQ5Wy8kpSc5iv70wO-_4bmqAvdsJBA&usqp=CAU"
                alt="Logo"
                className={styles.LogoPrincipal}
              />
            </a>
          </div>
        </div>

        {/* //NOTE - Tercer componente */}
        <CartWidget />
      </div>
      {isHome && <SearchBar />}
    </div>
  );
};

export default Navbar;
