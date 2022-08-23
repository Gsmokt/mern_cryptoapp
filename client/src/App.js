import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CoinDetails from "./components/CoinDetails";
import { AppContext } from "./store/Store";
import { apiCoins } from "./components/axios";
import NotFound from "./components/NotFound";

function App() {
  const { setCoins } = useContext(AppContext);
  const [value, setValue] = useState("");

  const getCoints = async () => {
    const { data } = await apiCoins();
    setCoins(data);
  };

  useEffect(() => {
    getCoints();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Search setValue={setValue} />
              <Coins setValue={setValue} value={value} />
            </>
          }
        />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
