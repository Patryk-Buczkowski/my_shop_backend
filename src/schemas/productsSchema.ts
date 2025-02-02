import mongoose from "mongoose";
import { CategoryType, ProductType } from "../types/productType";

const schema = mongoose.Schema;

const productSchema = new schema<ProductType>(
  {
    title: {
      type: String,
      minlength: [3, "Title of product must have at least 3 figures"],
      require: [true, "title is required"],
    },
    rate: {
      type: [Number],
      min: [0, "Rate min 0"],
      max: [6, "Rate max 6"],
      default: [0],
      required: [true, "Rate is required"],
      validate: {
        validator: (value: number[]) =>
          value.every((num) => num >= 0 && num <= 6),
        message: "Each rate must be a number between 0 and 6",
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "baby products",
        "stationery",
        "baked goods",
        "beverages",
        "bio food",
        "confectionery",
        "cosmetics",
        "dairy products",
        "drinks",
        "electronics",
        "food",
        "frozen food",
        "fruits and vegetables",
        "health supplements",
        "home decor",
        "household chemicals",
        "household goods",
        "meat",
        "other",
        "personal hygiene",
        "pet supplies",
        "seafood",
        "snacks",
        "stationery",
      ] as CategoryType[],
      default: "other",
    },
    averageRate: {
      type: Number,
      default: 0,
    },
    rateCount: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    price: {
      type: Number,
      min: 0,
      require: [true, "Price is required"],
    },
    description: {
      type: String,
      require: [true, "Description is required"],
    },
    pictureUrl: {
      type: String,
    },
    quantityAvailable: {
      type: Number,
      default: 1,
      min: [1, "quantityAvailable cannot be negative"],
    },
  },
  { timestamps: true },
);

productSchema.methods.updateAverageRate = function (newRate: number) {
  this.rateCount += 1;
  this.averageRate =
    ((this.rateCount - 1) * this.averageRate + newRate) / this.rateCount;
  return this.save();
};

productSchema.virtual("commentsList", {
  ref: "comment",
  localField: "_id",
  foreignField: "productId",
});

const Product = mongoose.model("product", productSchema);

export default Product;
