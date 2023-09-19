import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import Hamburguer from '../../assets/svg/hamburger.svg';
import FlechaAtrasIcono from '../../assets/svg/FlechaAtras.svg';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isCart = location.pathname === '/cart';
  const isItemDetail = location.pathname.includes('/itemDetail');
  const isCheckOutForm = location.pathname.includes('/checkoutForm');

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.navbar__container}>
      <MobileMenu openMenu={openMenu} />

      <div className={styles.navbar__firstLine}>
        <div className={styles.navbar__menuMobile}>
          {!isCheckOutForm && !isCart && !isItemDetail ? (
            <img
              className={styles.navbar__menuMobile_icon}
              onClick={handleOpenMenu}
              src={Hamburguer}
              alt="Icono de menu"
            />
          ) : (
            <img
              className={styles.navbar__menuMobile_icon}
              onClick={handleClickBack}
              src={FlechaAtrasIcono}
              alt="Icono de menu"
            />
          )}
        </div>

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

        <CartWidget />
      </div>
      {!isCheckOutForm && !isCart && !isItemDetail && <SearchBar />}
    </div>
  );
};

export default Navbar;
