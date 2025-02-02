import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../src/schemas/productsSchema";
import axios from "axios";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

await mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const addPicturesToProducts = async () => {
  const start = performance.now();
  try {
    const response = await fetch("https://picsum.photos/400/400?random=12345");

    const url = response.url;

    const result = await Product.updateMany({
      $set: { pictureUrl: url },
    });

    console.log(`Updated ${result.modifiedCount} products.`);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(
      `Adding pictures to products took: ${(end - start).toFixed(2)} ms`,
    );
  }
};

addPicturesToProducts()
  .then(() => console.log("Adding pictures to product successful 👍"))
  .catch(() => console.log("Adding pictures to product error ❌"));
