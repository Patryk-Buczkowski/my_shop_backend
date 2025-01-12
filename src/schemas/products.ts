import mongoose from "mongoose";
import { ProductType } from "../types/productType";

const schema = mongoose.Schema;

const product = new schema<ProductType>({
  title: {
    type: String,
    minlength: [3, 'Title of product must have at least 3 figures'],
    require: [true, "title is required"],
  },
  price: {
    type: Number,
    min: 0,
    require: [true, "Price is required"],
  },
  description: {
    type: String,
    require: [true, "Description is required"],
  },
  quantityAvailable: {
    type: Number,
    default: 1,
    min: [1, "quantityAvailable cannot be negative"],
  },
});

const Product = mongoose.model("product", product);

export default Product;
