import React, { useContext, useEffect, useState } from 'react';
import style from './CategoriesList.module.css';
import { getAllCategoriesItems } from '../../Services/categories.service';
import { SearchContext } from '../Context/SearchContext';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const { setSearchedCategory, searchedCategory } = useContext(SearchContext);

  useEffect(() => {
    getAllCategoriesItems()
      .then((res) => {
        const filteredData = res.filter((category) => {
          return category.name && category.products.length > 0;
        });
        const data = filteredData.map((category) => {
          return category.name;
        });
        const sortedData = data.sort((a, b) => {
          return a.localeCompare(b);
        });
        //NOTE - Ver oporque no filtra las cat que no tienen productos
        setCategories(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
