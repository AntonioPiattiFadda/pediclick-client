import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

const ItemList = ({ items }) => {
  return (
    <>
      <div className={styles.itemList}>
        {items.map((element) => {
          return <Item key={element.id} element={element} />;
        })}
        <div style={{ height: '4rem' }}></div>
      </div>
    </>
  );
};

export default ItemList;
