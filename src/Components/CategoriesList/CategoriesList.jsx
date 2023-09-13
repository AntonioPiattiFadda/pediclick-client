import React, { useContext, useEffect, useState } from 'react';
import style from './CategoriesList.module.css';
import { getCategories } from '../../Services/categories.service';
import { SearchContext } from '../Context/SearchContext';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const { setSearchedCategory, searchedCategory } = useContext(SearchContext);

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
              searchedCategory === category ? style.activeLink : style.category
            }
          >
            <button
              onClick={() => {
                setSearchedCategory(category);
              }}
              className={style.link}
            >
              {category}
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default CategoriesList;
