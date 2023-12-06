import React from 'react';
import styles from './RemoveFromCart.module.css';
import AlertIconBorder from '../../assets/svg/AlertIconBorder.svg';
import AlertIconCenter from '../../assets/svg/AlertIconCenter.svg';

const RemoveFromCartModal = ({
  confirmDelete,
  cancelDelete,
  productToDelete,
}) => {
  const { product, unitPrice } = productToDelete;
  if (!product || !unitPrice) return null;
  return (
    <div className={styles.container}>
      <div className={styles.leftInfo}>
        <div className={styles.imgContainer}>
          <img src={AlertIconBorder} alt="Icono de precaución" />
          <img src={AlertIconCenter} alt="Icono de precaución" />
        </div>
        <p>
          Se eliminará el producto
          <span>
            “{product.name} {unitPrice.name}”
          </span>
          de su pedido.
        </p>
      </div>
      <div className={styles.rigthInfo}>
        <span>Ésta acción no puede deshacerse</span>
        <button className={styles.confirmButton} onClick={confirmDelete}>
          Confirmar
        </button>
        <button className={styles.cancelButton} onClick={cancelDelete}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RemoveFromCartModal;
