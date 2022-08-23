import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/CoinsDetails.module.css";
import Chart from "./Chart";
import { AppContext } from "../store/Store";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import {
  apiCoin,
  apiCoinHistory,
  apiAddToWatchlist,
  apiRemoveFromWatchlist,
} from "./axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoinDetails = () => {
  const [close, setClose] = useState(false);
  const [open, setOpen] = useState(false);
  const context = useContext(AppContext);
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [history, setHistory] = useState([]);
  const [resInfo, setResInfo] = useState("");

  const getHistory = async () => {
    try {
      const { data } = await apiCoinHistory(params.id);
      setHistory([...data.prices]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getCoin = async () => {
    try {
      const { data } = await apiCoin(params.id);
      setCoin(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addToWatchList = async () => {
    try {
      const { data } = await apiAddToWatchlist({
        id: context.isLogged.uid,
        coin: coin.id,
      });
      context.setWatchlist([...context.watchlist, coin.id]);
      setResInfo(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const removeFromWatchList = async () => {
    try {
      const { data } = await apiRemoveFromWatchlist({
        id: context.isLogged.uid,
        coin: coin.id,
      });
      context.setWatchlist((prevState) =>
        prevState.filter((item) => item !== coin.id)
      );
      setResInfo(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setClose(true);
    setTimeout(() => {
      setClose(false);
    }, 2000);
  };

  useEffect(() => {
    getCoin();
    getHistory();
    // eslint-disable-next-line
  }, [params.id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.coinDetails}>
        <br />
        {coin.image ? <img src={coin.image.large} alt="Not found" /> : null}
        <h2>{coin?.name}</h2>
        <br />
        <p className={styles.description}>
          {coin.description?.en.split(".")[0]}
        </p>
        <br />
        <div className={styles.stats}>
          <h2>Rank: </h2>
          <h2>{coin.market_cap_rank}</h2>
        </div>
        <br />
        <div className={styles.stats}>
          <h2>7 days change: </h2>
          {coin.market_data ? (
            <h2>{coin.market_data.price_change_percentage_7d.toFixed(2)} %</h2>
          ) : null}
        </div>
        <br />
        <div className={styles.stats}>
          <h2>30 days change: </h2>
          {coin.market_data ? (
            <h2>{coin.market_data.price_change_percentage_30d.toFixed(2)} %</h2>
          ) : null}
        </div>
        {context.isLogged &&
          (context.watchlist?.includes(coin.id) ? (
            <button onClick={removeFromWatchList} className={styles.btn}>
              Remove from watchlist
            </button>
          ) : (
            <button onClick={addToWatchList} className={styles.btn}>
              Add to watchlist
            </button>
          ))}
        <Collapse in={close}>
          <Alert
            severity="error"
            variant="outlined"
            sx={{ color: "#DCDCDC", mb: 2, mt: 2, ml: 1 }}
          >
            {resInfo}
          </Alert>
        </Collapse>
        <Collapse in={open}>
          <Alert
            severity="success"
            variant="outlined"
            sx={{ color: "#DCDCDC", mb: 2, mt: 2, ml: 1 }}
          >
            {resInfo}
          </Alert>
        </Collapse>
      </div>
      <div className={styles.chart}>
        <Chart history={history} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default CoinDetails;
