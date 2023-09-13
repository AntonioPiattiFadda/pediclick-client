import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

const ItemList = ({ items }) => {
  if (items.length === 0) {
    return <h1>No hay productos bro</h1>;
  }

  return (
    <>
      <div className={styles.itemList}>
        {items.map((element) => {
          return <Item key={element.id} element={element} />;
        })}
      </div>
      <div
        style={{
          width: '120px',
        }}
      ></div>
    </>
  );
};

export default ItemList;
