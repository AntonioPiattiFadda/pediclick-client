import React, { useContext } from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import ItemCount from '../ItemCount/ItemCount';

const Item = ({ element }) => {
  const { addToCart } = useContext(CartContext);

  const handleClick = (item) => {
    const itemToAdd = { ...item, quantity: 1 };
    addToCart(itemToAdd);
  };

  return (
    <>
      <Link to={`/itemDetail/${element.id}`} style={{ textDecoration: 'none' }}>
        <div className={styles.cardContainer}>
          <div className={styles.cardInformation}>
            <div className={styles.cardInformationContent}>
              <span>{element.name}</span>
              <span>{element.description}</span>
              <span>${element.price}</span>
            </div>
          </div>
          <div className={styles.cardImageContainer}>
            <img className={styles.cardImage} src={element.image} alt="" />
          </div>
        </div>
      </Link>
      <ItemCount />
      <button
        onClick={() => handleClick(element)}
        className={styles.cardButton}
      >
        +
      </button>
    </>
  );
};

export default Item;
