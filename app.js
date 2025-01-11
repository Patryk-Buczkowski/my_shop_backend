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
  ], // Dozwolone domeny
  methods: ["GET", "POST", "PUT", "DELETE"], // Dozwolone metody HTTP
  allowedHeaders: ["Content-Type", "Authorization"], // Dozwolone nagłówki
  credentials: true, // Wsparcie dla ciasteczek i autoryzacji
  optionsSuccessStatus: 200, // Kod odpowiedzi dla preflight requests
};
app.use(cors(corseOptions));

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", productRouter);

export default app;
