import React, { useContext } from 'react';
import style from './SearchBar.module.css';
import { SearchContext } from '../Context/SearchContext';
import MagnifyingGlass from '../../assets/svg/MagnifyingGlass.svg';
import CategoriesList from '../CategoriesList/CategoriesList';

const SearchBar = () => {
  const { searchString, setSearchString } = useContext(SearchContext);

  return (
    <>
      <div className={style.searchInput__container}>
        <img
          className={style.searchInput__MagnifyingGlass}
          src={MagnifyingGlass}
          alt="Lupa para buscar productos"
        />
        <input
          style={{
            fontSize: '16px',
          }}
          className={style.searchInput}
          value={searchString}
          type="text"
          placeholder="Papas, batata..."
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>

      <CategoriesList />
    </>
  );
};

export default SearchBar;
