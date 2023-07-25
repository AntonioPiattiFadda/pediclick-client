import React, { useContext } from 'react';
import style from './SearchBar.module.css';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { SearchContext } from '../Context/SearchContext';
const SearchBar = () => {
  const { searchString, setSearchString } = useContext(SearchContext);

  return (
    <div className={style.searchInput__container}>
      <RxMagnifyingGlass
        style={{
          fontSize: '28px',
        }}
      />
      <input
        className={style.searchInput}
        value={searchString}
        type="text"
        placeholder="Papas, batata..."
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
