import express from "express";
import { addProduct } from "../controllers/productControler/addProduct";
import { validateProducts } from "validators/validateProduct";

const productRouter = express.Router();

productRouter.post("/addProduct",validateProducts, addProduct);

export default productRouter;
