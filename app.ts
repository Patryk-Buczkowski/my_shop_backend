import express from "express";
import userRouter from "./src/routes/users.ts";
import cors from 'cors';
import productRouter from "./src/routes/product.ts";

const app = express();

const corseOptions = {
  origin: [
    "http://example.com",
    "http://localhost:3000",
    "http://localhost:5000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corseOptions));

app.use(express.json());

app.use("/my_shop_api", userRouter);
app.use("/my_shop_api", productRouter);

export default app;
