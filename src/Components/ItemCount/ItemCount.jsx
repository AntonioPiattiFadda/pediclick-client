import { useEffect, useState } from 'react';
import styles from './ItemCount.module.css';

const ItemCount = ({ initial = 0, onAdd, onMinus }) => {
  const [contador, setContador] = useState(initial);
  useEffect(() => {
    setContador(initial);
  }, [initial]);

  const sumar = () => {
    onAdd();
    setContador(contador + 1);
  };

  const restar = () => {
    onMinus(contador);
    setContador(contador - 1);
  };

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
    <div className={styles.container}>
      <button className={styles.button} onClick={restar}>
        -
      </button>
      <span className={styles.counter}>{contador}</span>
      <button className={styles.button} onClick={sumar}>
        +
      </button>
    </div>
  );
};

export default ItemCount;
