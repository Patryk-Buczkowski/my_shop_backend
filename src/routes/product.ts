import express from "express";
import { addProduct } from "../controllers/productControler/addProduct";
import { validateProducts } from "validators/validateProduct";
import { removeById } from "controllers/productControler/removeById";
import passport from "passport";

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  validateProducts,
  passport.authenticate("roleModerator", { session: false }),
  addProduct
);
productRouter.delete("/remove/:_id", removeById);

export default productRouter;
