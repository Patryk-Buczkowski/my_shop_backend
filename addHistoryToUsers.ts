import mongoose from "mongoose";
import User from "./src/schemas/userSchema";
import Products from "./src/schemas/productsSchema";
import dotenv from "dotenv";
import { ProductBought } from "./src/types/productBought";
dotenv.config();

const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("connected"))
  .catch(() => {
    console.log("error in connection to db");
  });

const addHistoryToUsers = async () => {
  const start = performance.now();
  try {
    const users = await User.find();
    const products = await Products.find();

    for (const user of users) {
      const history: ProductBought[] = [];
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * products.length);
        const randomAmount = Math.floor((Math.random() * 101) + 1);

        history.push({
          amount: randomAmount,
          product: products[randomIndex]._id,
        });
      }
      user.productsBought.push(...history)
      await user.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    const end = performance.now();
    console.log(`Action Took: ${(end - start).toFixed(2)} ms`);
  }
};

addHistoryToUsers();
