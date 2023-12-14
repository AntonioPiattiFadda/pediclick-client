import React, { useContext, useState } from 'react';
import styles from './UnitPrice.module.css';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../Context/CartContext';
import AddToCartModal from '../Modal/AddToCart';

const UnitPrice = ({ unitPrice, item }) => {
  const [showModal, setShowModal] = useState(false);
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
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
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
          {unitPrice.blocked ? (
            <span className={styles.checkBoxNoStock}></span>
          ) : (
            <input
              className={styles.checkBox}
              type="checkbox"
              name="tarea1"
              value="hecho"
              onChange={handleCheckboxChange}
              checked={isItemInCart}
            />
          )}
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
        {unitPrice.blocked ? (
          <span className={styles.noStock}>
            SIN STOCK <br /> DISPONIBLE
          </span>
        ) : (
          <span className={styles.price}>${unitPrice.value}</span>
        )}
      </div>
      {showModal && <AddToCartModal />}
    </div>
  );
};

export default UnitPrice;
