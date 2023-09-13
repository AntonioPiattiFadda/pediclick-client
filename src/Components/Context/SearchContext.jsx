import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  const [searchString, setSearchString] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('');
  const data = {
    searchedCategory,
    setSearchedCategory,
    searchString,
    setSearchString,
  };
  return (
    <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
