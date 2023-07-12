import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Swal from 'sweetalert2';
import FormCheckout from '../FormCheckout/FormCheckout';
import EmptyCart from '../EmptyCart/EmptyCart';
import Form from '../Form/Form';
import Formulario from '../Form/Form';
import styles from './Cart.module.css';

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

  const handleMinus = (id) => {
    minusOneElement(id);
  };

  return !showFormCheckout ? (
    cart.length ? (
      <div className={styles.cartContainer}>
        <h1 className={styles.title}>Mi carrito de compras</h1>
        <div className={styles.cartItems}>
          {cart.map((product) => {
            return (
              <div className={styles.cartItem} key={product.id}>
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.name}
                />
                <div className={styles.productDetails}>
                  <h3 className={styles.productTitle}>{product.name}</h3>

                  <div className={styles.productPriceAndQuantity}>
                    <p className={styles.productPrice}>${product.price}</p>
                    <div className={styles.productQuantity}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => handleMinus(product.id)}
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
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeProduct(product.id)}
                >
                  Eliminar producto
                </button>
              </div>
            );
          })}
        </div>
        <div className={styles.cartTotal}>
          <p className={styles.totalText}>Total:</p>
          <p className={styles.totalAmount}>${total}</p>
        </div>
        <div className={styles.cartButtons}>
          <button className={styles.clearButton} onClick={handleClear}>
            Limpiar carrito
          </button>
          <button className={styles.buyButton} onClick={handleBuy}>
            Comprar
          </button>
        </div>
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
