import mongoose from "mongoose";
import { ProductType } from "../types/productType";
import { populate } from "dotenv";

const schema = mongoose.Schema;

const productSchema = new schema<ProductType>(
  {
    title: {
      type: String,
      minlength: [3, "Title of product must have at least 3 figures"],
      require: [true, "title is required"],
    },
    rate: {
      type: Number,
      min: [0, "Rate min 0"],
      max: [6, "Rate max 6"],
      default: 0,
      required: [true, "Rate is required"],
      validate: {
        validator: Number.isFinite,
        message: "Rate must be a valid number",
      },
    },
    averageRate: {
      type: Number,
      default: 0,
    },
    rateCount: {
      type: Number,
      default: 0,
    },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, default: [], ref: "comment" },
    ],
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
  },
  { timestamps: true }
);

productSchema.methods.updateAverageRate = function (newRate: number) {
  this.rateCount += 1;
  this.averageRate =
    ((this.rateCount - 1) * this.averageRate + newRate) / this.rateCount;
  return this.save();
};

productSchema.virtual("commentsList", {
  ref: "comment",
  localField: "productId",
  foreignField: "_id",
});

const Product = mongoose.model("product", productSchema);

export default Product;
