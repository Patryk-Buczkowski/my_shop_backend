import mongoose from "mongoose";
import { ProductType } from "src/types/productType";

const schema = mongoose.Schema;

const product = new schema<ProductType>({
  title: {
    type: String,
    require: [true, "title is required"],
  },
  price: {
    type: Number,
    require: [true, "Price is required"],
  },
  description: {
    type: String,
    require: [true, "Description is required"],
  },
  quantityAvailable: {
    type: Number,
    default: 0,
    min: [0, "quantityAvailable cannot be negative"],
  },
});

const Product = mongoose.model("product", product);

export default Product;
