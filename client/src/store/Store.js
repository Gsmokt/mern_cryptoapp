import React, { createContext, useState } from "react";

export const AppContext = createContext();

const Store = ({ children }) => {
  const [coins, setCoins] = useState([]);

  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [watchlist, setWatchlist] = useState([]);

  return (
    <AppContext.Provider
      value={{
        isLogged,
        setIsLogged,
        coins,
        setCoins,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Store;
