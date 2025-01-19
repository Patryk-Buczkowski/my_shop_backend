import express from "express";
import { addProduct } from "../controllers/productControler/addProduct";
import { validateProducts } from "validators/validateProduct";
import { removeById } from "controllers/productControler/removeById";
import passport from "passport";
import { addComment } from "controllers/productControler/addComment";
import { validateNewComment } from "validators/validateNewComment";
import { deleteComment } from "controllers/productControler/deleteComment";
import { addRate } from "controllers/productControler/addRate";

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  validateProducts,
  passport.authenticate("roleModerator", { session: false }),
  addProduct
);
productRouter.delete("/remove/:_id", removeById);

productRouter.put(
  "/addProductComment",
  validateNewComment,
  passport.authenticate("roleUser", { session: false }),
  addComment
);

productRouter.delete(
  "/deleteComment/:commentId",
  passport.authenticate("roleModerator", { session: false }),
  deleteComment
);

productRouter.post(
  "/addRate/:productId",
  passport.authenticate("roleUser", { session: false }),
  addRate
);

export default productRouter;
