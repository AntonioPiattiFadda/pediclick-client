import React from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';

const ItemList = ({ items, category }) => {
  return (
    <>
      {items.length !== 0 && (
        <span className={styles.itemListCategorieTittle}>
          {category} | {category} | {category} | {category} | {category} |{' '}
          {category} | {category}
        </span>
      )}

      <div className={styles.itemList}>
        {items.map((element) => {
          return <Item key={element.id} element={element} />;
        })}
      </div>
    </>
  );
};

export default ItemList;
