import styles from './ItemCount.module.css';
const ItemCount = ({ blocked, initial, handlePlusClick, handleMinusClick }) => {
  return (
    <>
      <div className={styles.container}>
        <button onClick={handleMinusClick} className={styles.button}>
          -
        </button>
        <span className={styles.counter}>{initial}</span>
        <button onClick={handlePlusClick} className={styles.button}>
          +
        </button>
      </div>
    </>
  );
};

export default ItemCount;
