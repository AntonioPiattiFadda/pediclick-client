import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './Cart.module.css';
import Delete from '../../assets/svg/Delete.svg';

const Cart = () => {
  const {
    cart,
    getCartTotalPrice,
    addOneUnitPriceQuantity,
    minusOneUnitPriceQuantity,
    removeUnitPrice,
  } = useContext(CartContext);
  const total = getCartTotalPrice();

  return cart.length ? (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Carrito de compra</h2>
      <div className={styles.cartItems}>
        {cart.map((product) => {
          const productValue = product.unit_price.map((unitPrice) => {
            return (
              <div className={styles.cartItem} key={product.id}>
                <div className={styles.cartItemFirstLine}>
                  <div className={styles.cartImage}>
                    <img
                      className={styles.cartImage}
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.cardInfo_container}>
                    <span className={styles.cardName}>
                      {product.name} <br />X{unitPrice.name}{' '}
                    </span>
                    <span className={styles.cardPrice}>${unitPrice.value}</span>
                  </div>
                </div>
                <div className={styles.cardInfo_deleteandcount}>
                  <img
                    className={styles.cardInfo_deleteIcon}
                    src={Delete}
                    alt="Eliminar producto del carrito"
                    onClick={() => removeUnitPrice(product, unitPrice)}
                  />
                  <div className={styles.cartCount}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        minusOneUnitPriceQuantity(product, unitPrice)
                      }
                    >
                      -
                    </button>
                    <p className={styles.quantity}>{unitPrice.quantity}</p>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        addOneUnitPriceQuantity(product, unitPrice)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          });
          return productValue;
        })}
      </div>

      <div className={styles.cartTotal}>
        <p>Codigo de descuento</p>
        <p className={styles.totalAmount}>Aplicar</p>
      </div>
      <p className={styles.totalText}>Total de la compra</p>
      <div className={styles.cartTotal}>
        <p>{cart.length} productos</p>
        <p className={styles.totalAmount}>${total}</p>
      </div>

      <div className={styles.cartButtons}></div>

      <div style={{ height: '4rem' }}></div>
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
