import { RxHamburgerMenu } from 'react-icons/rx';
import CartWidget from '../CartWidget/CartWidget';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';
import { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={styles.navbar__container}>
      {openMenu && <MobileMenu />}

      <div className={styles.navbar__firstLine}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RxHamburgerMenu
            style={{
              zIndex: '9999',
              fontSize: '32px',
              marginLeft: '20px',
            }}
            onClick={handleOpenMenu}
          />
        </div>
        <a href="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8nWPb3DyHkw5qoJBwFH-xJzpVRhUNL8zdJUM-nQ5Wy8kpSc5iv70wO-_4bmqAvdsJBA&usqp=CAU"
            alt="Logo"
            className={styles.LogoPrincipal}
          />
        </a>
        <CartWidget />
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
