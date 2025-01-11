import mongoose, { SchemaTypes } from "mongoose";
import { UserType } from "src/types/userType";

const schema = mongoose.Schema;

const user = new schema<UserType>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age must be a positive number"],
      max: [120, "Age must be less than 120"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+@.+\..+/, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    country: {
      type: String,
      enum: ["PL", "US", "DE", "UK", "FR"],
      required: [true, "Choose country ('PL', 'US', 'DE', 'UK', 'FR')"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    productsBought: [
      {
        product: { type: SchemaTypes.ObjectId, ref: "Product" },
        amount: {
          type: Number,
          min: [1, "Amount must be at lest 1"],
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", user);

export default User;
