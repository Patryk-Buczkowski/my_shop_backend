import mongoose, { SchemaTypes } from "mongoose";
import { UserType } from "../types/userType";

const schema = mongoose.Schema;

const userSchema = new schema<UserType>(
  {
    name: {
      type: String,
      minlength: [3, "Name must have min 3 letters"],
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
      minlength: [6, "Password length min 6 figures"],
    },
    country: {
      type: String,
      enum: ["PL", "US", "DE", "UK", "FR"],
      required: [true, "Choose country ('PL', 'US', 'DE', 'UK', 'FR')"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Back-end do not add verificationToken"],
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
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
