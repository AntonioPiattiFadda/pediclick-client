import { useContext, useEffect, useState, useRef } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import styles from './CartWidget.module.css';

const CartWidget = () => {
  const [cartQuestion, setCartQuestion] = useState(false);
  const { cart, clearCart } = useContext(CartContext);
  const totalElements = cart.length;

  useEffect(() => {
    if (totalElements >= 1) {
      setCartQuestion(true);
    }
  }, []);

  const handleClick = (e) => {
    setCartQuestion(false);
    if (e.target.value === 'no') {
      clearCart();
    }
  };

  return (
    <div className={styles.cart__container}>
      <Link to="/cart">
        <span className={styles.cart__count}>{totalElements}</span>
        <BsCart2 className={styles.cart__icon} />
      </Link>
      {/* NOTE - Iria el cartquestion pero todavia no tiene funcionalidad */}
      {false && (
        <div
          id="cart__question"
          style={{
            position: 'absolute',
            right: '10px',
            width: '150px',
            height: 'auto',
            backgroundColor: 'white',
            padding: '10px',
            border: ' 1px solid grey',
            borderRadius: '5px',
          }}
        >
          <span>
            Tenemos registrada una compra anterior, quieres restaurarla?
          </span>
          <div
            style={{
              display: 'flex',
              gap: '5px',
              marginTop: '10px',
            }}
          >
            <button value={'si'} onClick={handleClick}>
              Si
            </button>
            <button value={'no'} onClick={handleClick}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget;
