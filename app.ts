import express from "express";
import userRouter from "./src/routes/users.js";
import cors from "cors";
import productRouter from "./src/routes/product.js";
import passport from "passport";
import "./src/utils/passport-utils.js";

const app = express();
app.use(express.json());

// Middleware dla formularzy (w tym `multipart/form-data`)
app.use(express.urlencoded({ extended: true }));

// Konfiguracja `multer` (folder `uploads/` dla plików)
// const upload = multer({ dest: "uploads/" });

const corseOptions = {
  // origin: [
  //   "http://example.com",
  //   "http://localhost:3000",
  //   "http://localhost:5000",
  // ],
  origin: true, // for dev
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
