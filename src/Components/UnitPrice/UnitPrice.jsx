import React, { useContext } from 'react';
import styles from './UnitPrice.module.css';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../Context/CartContext';

const UnitPrice = ({ unitPrice, item }) => {
  const {
    isUnitPriceInCart,
    addUnitPriceToProduct,
    removeUnitPriceFromProduct,
    getQuantityForUnitPrice,
    addOneUnitPriceQuantity,
    minusOneUnitPriceQuantity,
  } = useContext(CartContext);
  const quantity = getQuantityForUnitPrice(item, unitPrice);
  const isItemInCart = isUnitPriceInCart(item.name, unitPrice);

  const handleCheckboxChange = () => {
    if (isItemInCart) {
      removeUnitPriceFromProduct(item, unitPrice);
    } else {
      addUnitPriceToProduct(item, unitPrice);
    }
  };

  const handlePlusClick = () => {
    addOneUnitPriceQuantity(item, unitPrice);
  };
  const handleMinusClick = () => {
    minusOneUnitPriceQuantity(item, unitPrice);
  };

  return (
    <div className={styles.infoContainer}>
      <div>
        <label>
          <input
            className={styles.checkBox}
            type="checkbox"
            name="tarea1"
            value="hecho"
            onChange={handleCheckboxChange}
            checked={isItemInCart}
          />{' '}
          {unitPrice.name}
        </label>
      </div>
      <div className={styles.countAndPrice}>
        {quantity > 0 ? (
          <ItemCount
            handlePlusClick={handlePlusClick}
            handleMinusClick={handleMinusClick}
            unitPrice={unitPrice}
            initial={quantity || 0}
          />
        ) : null}
        <span className={styles.price}>${unitPrice.value}</span>
      </div>
    </div>
  );
};

export default UnitPrice;
