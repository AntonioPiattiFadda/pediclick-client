import React, { useEffect, useState } from 'react';
import style from './CategoriesList.module.css';
import { getCategories } from '../../Services/categories.service';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((res) => {
        const data = res.map((category) => {
          return category.name;
        });
        const sortedData = data.sort((a, b) => {
          return a.localeCompare(b);
        });
        setCategories(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //NOTE - Resalatar al active Link
  const [activeLink, setActiveLink] = useState('');

  return (
    <div className={style.categories__container}>
      {categories.map((category) => {
        return (
          <span
            key={category}
            className={
              activeLink === category ? style.activeLink : style.category
            }
          >
            <a className={style.link} href={`/${category}`}>
              {category}
            </a>
          </span>
        );
      })}
    </div>
  );
};

export default CategoriesList;
