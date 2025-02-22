import express from "express";
import userRouter from "./src/routes/users.js";
import cors from "cors";
import productRouter from "./src/routes/product.js";
import passport from "passport";
import "./src/utils/passport-utils.js";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corseOptions = {
  origin: ["https://patryk-buczkowski.github.io/"],
  // origin: true, // for dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corseOptions));
app.use(passport.initialize());

app.use("/my_shop_api", userRouter);
app.use("/my_shop_api", productRouter);

export default app;
