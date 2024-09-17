import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import EmptyCart from '../EmptyCart/EmptyCart';
import styles from './Cart.module.css';
import Delete from '../../assets/svg/Delete.svg';
import RemoveFromCartModal from '../Modal/RemoveFromCart';

const Cart = () => {
  const {
    cart,
    getCartTotalPrice,
    addOneUnitPriceQuantity,
    minusOneUnitPriceQuantity,
    removeUnitPrice,
  } = useContext(CartContext);
  const total = getCartTotalPrice();
  const [showModal, setShowModal] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);

  const handleDelete = (product, unitPrice) => {
    setProductToDelete({ product, unitPrice });
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const { product, unitPrice } = productToDelete;
      removeUnitPrice(product, unitPrice);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

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
                      alt={product.product_name}
                    />
                  </div>
                  <div className={styles.cardInfo_container}>
                    <span className={styles.cardName}>
                      {product.product_name} <br />X{unitPrice.unit}{' '}
                    </span>
                    <span className={styles.cardPrice}>${unitPrice.price}</span>
                  </div>
                </div>
                <div className={styles.cardInfo_deleteandcount}>
                  <img
                    className={styles.cardInfo_deleteIcon}
                    src={Delete}
                    alt="Eliminar producto del carrito"
                    onClick={() => handleDelete(product, unitPrice)}
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
      {/* NOTE - Lo puse porque a veces el que se guarde en el local storage no se
      borra y queda el carrito con el producto que se borro */}
      {/* <div className={styles.cartTotal}>
        <p>Vaciar Carrito</p>
        <button onClick={clearCart} className={styles.totalAmount}>
          Vaciar
        </button>
      </div> */}
      {/*NOTE - Codigo de descuento para la V2 */}
      {/* <div className={styles.cartTotal}>
        <p>Codigo de descuento</p>
        <p className={styles.totalAmount}>Aplicar</p>
      </div> */}
      <p className={styles.totalText}>Total de la compra</p>
      <div className={styles.cartTotal}>
        <p>{cart.length} productos</p>
        <p className={styles.totalAmount}>${total}</p>
      </div>
      <div className={styles.cartButtons}></div>
      <div style={{ height: '4rem' }}></div>
      {showModal && (
        <RemoveFromCartModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
          productToDelete={productToDelete}
        />
      )}
    </div>
  ) : (
    <EmptyCart />
  );
};

export default Cart;
