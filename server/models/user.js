import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user: String,
  coins: [String],
});

const User = mongoose.model("Users", userSchema);

export default User;
