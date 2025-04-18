import express from "express";
import { addProduct } from "../controllers/productControler/addProduct";
import { validateProducts } from "validators/validateProduct";
import { removeById } from "controllers/productControler/removeById";
import passport from "passport";
import { addComment } from "controllers/productControler/addComment";
import { validateNewComment } from "validators/validateNewComment";
import { deleteComment } from "controllers/productControler/deleteComment";
import { addRate } from "controllers/productControler/addRate";
import { changeQuantity } from "controllers/productControler/changeQuantity";
import { getDetails } from "controllers/productControler/getDetails";
import { filterProduct } from "controllers/productControler/filterProduct";
import { updateProduct } from "controllers/productControler/updateProduct";
import { deleteProduct } from "controllers/productControler/deleteProduct";

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  validateProducts,
  passport.authenticate("roleModerator", { session: false }),
  addProduct,
);
productRouter.delete("/remove/:_id", removeById);

productRouter.put(
  "/addProductComment",
  validateNewComment,
  passport.authenticate("roleUser", { session: false }),
  addComment,
);

productRouter.delete(
  "/deleteComment/:commentId",
  passport.authenticate("roleAdmin", { session: false }),
  deleteComment,
);

productRouter.delete(
  "/deleteProduct/:productId",
  passport.authenticate("roleAdmin", { session: false }),
  deleteProduct,
);

productRouter.post(
  "/addRate/:productId",
  passport.authenticate("roleUser", { session: false }),
  addRate,
);

productRouter.put(
  "/changeProductQty/:productId",
  passport.authenticate("roleModerator", { session: false }),
  changeQuantity,
);

productRouter.get("/product/:productId", getDetails);

productRouter.get("/filterProduct", filterProduct);

productRouter.put(
  "/updateProduct/:productId",
  passport.authenticate("roleModerator", { session: false }),
  // validateProducts,
  updateProduct,
);

export default productRouter;
