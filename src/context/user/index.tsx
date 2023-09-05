import React, { ReactNode, createContext, useState } from 'react';

export const SearchContext = createContext({
  productName: '',
  setProductName: (_user: string) => {},
});

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productName, setProductName] = useState('');

  return (
    <SearchContext.Provider value={{ productName, setProductName }}>
      {children}
    </SearchContext.Provider>
  );
};
