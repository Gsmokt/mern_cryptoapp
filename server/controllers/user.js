import User from "../models/user.js";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ user: req.body.user });
    if (user) {
      res.status(200).json(user);
    } else {
      const data = await User.create(req.body);
      res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Try later." });
  }
};
