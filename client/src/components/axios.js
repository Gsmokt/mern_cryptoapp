import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-cryptoapp.herokuapp.com",
});

export const apiCoins = () =>
  axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=30&page=1&sparkline=false"
  );

export const apiCoin = (id) =>
  axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

export const apiCoinHistory = (id) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=14&interval=daily`
  );

export const apiAddToWatchlist = (body) => instance.patch("/coins/new", body);

export const apiRemoveFromWatchlist = (body) => instance.patch("/coins", body);

export const apiLogin = (body) => instance.post(`/users/login`, body);

export const apiWatchlistCoins = (id) => instance.get(`/coins/${id}`);
