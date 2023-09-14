import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Swal from 'sweetalert2';
import FormCheckout from '../FormCheckout/FormCheckout';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './Cart.module.css';
import Delete from '../../assets/svg/Delete.svg';

const Cart = () => {
  const {
    cart,
    clearCart,
    removeProduct,
    getCartTotalPrice,
    addOneElement,
    minusOneElement,
  } = useContext(CartContext);

  const [showFormCheckout, setShowFormCheckout] = useState(false);
  const total = getCartTotalPrice();
  const handleBuy = () => {
    setShowFormCheckout(!showFormCheckout);
  };
  const handleClear = () => {
    Swal.fire({
      title: 'Do you want to clear the cart?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Clear',
      denyButtonText: `Don't clear`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        clearCart();
        Swal.fire('Cleared!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire(`The cart wasn't cleared`, '', 'info');
      }
    });
  };
  const handlePlus = (id) => {
    addOneElement(id);
  };

  const handleMinus = (id, quantity) => {
    if (quantity === 1) return;
    minusOneElement(id);
  };

  return !showFormCheckout ? (
    cart.length ? (
      <div className={styles.cartContainer}>
        <h2 className={styles.title}>Carrito de compra</h2>
        <div className={styles.cartItems}>
          {cart.map((product) => {
            return (
              <div className={styles.cartItem} key={product.id}>
                <div className={styles.cartImage}>
                  <img
                    className={styles.cartImage}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className={styles.cardInfo_container}>
                  <span className={styles.cardName}>{product.name}</span>
                  <span className={styles.cardPrice}>${product.price}</span>
                </div>

                <div>
                  <img
                    src={Delete}
                    alt="Eliminar producto del carrito"
                    onClick={() => removeProduct(product.id)}
                  />
                </div>
                {/* 
                <div className={styles.productDetails}>
                  <div className={styles.productPriceAndQuantity}>
                    <div className={styles.productQuantity}>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          handleMinus(product.id, product.quantity)
                        }
                      >
                        -
                      </button>
                      <p className={styles.quantity}>{product.quantity}</p>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handlePlus(product.id)}
                      >
                        +
                      </button>
                    </div>
                   
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>

        <div className={styles.cartTotal}>
          <p>Codigo de descuento</p>
          <p className={styles.totalAmount}>Aplicar</p>
        </div>
        <p className={styles.totalText}>Total de la compra</p>
        <div className={styles.cartTotal}>
          <p>{total} productos</p>
          <p className={styles.totalAmount}>${total}</p>
        </div>

        <div className={styles.cartButtons}></div>

        <span style={{ height: '4rem' }}></span>
      </div>
    ) : (
      <EmptyCart />
    )
  ) : (
    <FormCheckout
      getCartTotalPrice={getCartTotalPrice}
      cart={cart}
      clearCart={clearCart}
    />
  );
};

export default Cart;
