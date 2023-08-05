import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import Swal from 'sweetalert2';
import FormCheckout from '../FormCheckout/FormCheckout';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './Cart.module.css';
import { FiTrash } from 'react-icons/fi';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7e6390', // Color pastel que se usará para el focus
    },
  },
});

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
        <h1 className={styles.title}>Mi carrito de compras</h1>
        <div className={styles.cartItems}>
          {cart.map((product) => {
            return (
              <div className={styles.cartItem} key={product.id}>
                <div className={styles.productImageAndName}>
                  <img
                    className={styles.productImage}
                    src={product.image}
                    alt={product.name}
                  />
                  <span className={styles.productTitle}>{product.name}</span>
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productPriceAndQuantity}>
                    <p className={styles.productPrice}>${product.price}</p>
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
                    <FiTrash
                      className={styles.removeButton}
                      onClick={() => removeProduct(product.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.cartTotal}>
          <p className={styles.totalText}>Total:</p>
          <p className={styles.totalAmount}>${total}</p>
        </div>
        <div className={styles.cartButtons}>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" onClick={handleClear}>
              Limpiar carrito
            </Button>
            <Button variant="contained" onClick={handleBuy}>
              Comprar
            </Button>
          </ThemeProvider>
        </div>
        <span style={{ height: '30px' }}></span>
        <span style={{ height: '30px' }}></span>
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
