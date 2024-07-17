import { useState } from 'react';
import SearchContext from './SearchContext';

type SearchProviderProps = {
  children: React.ReactNode
};

function SearchProvider({ children }: SearchProviderProps) {
  const [searchInput, setSearchInput] = useState('');
  const [apiData, setApiData] = useState([0, 1]);

  return (
    <SearchContext.Provider
      value={ {
        searchInput,
        setSearchInput,
        apiData,
        setApiData,
      } }
    >
      { children }
    </SearchContext.Provider>
  );
}

export default SearchProvider;
