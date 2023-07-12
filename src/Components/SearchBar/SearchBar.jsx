import React, { useState } from 'react';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const [searchString, setSearchString] = useState('');

  return (
    <div className={style.searchInput__container}>
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
