import User from "../models/user.js";

export const getCoins = async (req, res) => {
  try {
    const data = await User.find({ user: req.params.id });
    const coins = data[0].coins;
    res.status(200).json(coins);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteCoin = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { user: req.body.id },
      {
        $pull: { coins: req.body.coin },
      }
    );
    res.status(201).json({ message: "Coin removed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createCoin = async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { user: req.body.id },
      {
        $push: { coins: req.body.coin },
      }
    );
    res.status(201).json({ message: "Coin added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
