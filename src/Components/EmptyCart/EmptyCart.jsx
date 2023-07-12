import React from "react";
import styles from "./EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <div className={styles.emptyCartContainer}>
      <img
        className={styles.emptyCartImage}
        src="https://i.postimg.cc/J0ZcqR1S/45461.jpg"
        alt="Empty Cart"
      />
      <h2 className={styles.emptyCartMessage}>
        No has seleccionado productos aún
      </h2>
    </div>
  );
};

export default EmptyCart;
