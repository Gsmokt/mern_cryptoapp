import exress from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import coinRoutes from "./routes/coin.js";
import cors from "cors";
import connectDB from "./db/db.js";
import xss from "xss-clean";
import helmet from "helmet";
dotenv.config();

const app = exress();
app.use(helmet());
app.use(xss());
const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
app.use(exress.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/coins", coinRoutes);

connectDB(MONGO_URL)
  .then(() => {
    console.log("Db connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
