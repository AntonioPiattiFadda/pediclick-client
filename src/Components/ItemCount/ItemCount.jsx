import { useEffect, useState } from 'react';
import styles from './ItemCount.module.css';
import { toast } from 'react-toastify';
const ItemCount = ({ blocked, initial = 0, onAdd, onMinus }) => {
  const [contador, setContador] = useState(initial);
  useEffect(() => {
    setContador(initial);
  }, [initial]);

  const sumar = () => {
    onAdd(addProductToast);
    setContador(contador + 1);
  };

  const restar = () => {
    onMinus(contador);
    setContador(contador - 1);
  };

  const addProductToast = (productName) => {
    return toast.info(`Añadiste ${contador + 1} ${productName} a tu carrito!`, {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  if (blocked) {
    return (
      <div className={styles.container}>
        <button className={styles.button}>+</button>
      </div>
    );
  }

  if (initial === 0) {
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={sumar}>
          +
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={restar}>
          -
        </button>
        <span className={styles.counter}>{contador}</span>
        <button className={styles.button} onClick={sumar}>
          +
        </button>
      </div>
    </>
  );
};

export default ItemCount;
