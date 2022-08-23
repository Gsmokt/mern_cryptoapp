import express from "express";
import { deleteCoin, getCoins, createCoin } from "../controllers/coin.js";
const router = express.Router();

router.patch("/new", createCoin);
router.get("/:id", getCoins);
router.patch("/", deleteCoin);

export default router;
