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
        <span style={{ height: '4rem' }}></span>
      </div>
    </>
  );
};

export default ItemList;
