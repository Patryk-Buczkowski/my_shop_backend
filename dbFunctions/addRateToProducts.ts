import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../src/schemas/productsSchema";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

await mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const addRateToProducts = async () => {
  const start = performance.now();
  try {
    const products = await Product.find();

    console.log(`Found ${products.length} products to update.`);

    for (const product of products) {
      const rates: number[] = Array.from({ length: 50 }, () =>
        Math.floor(Math.random() * 7),
      );

      for (const rate of rates) {
        await product.updateAverageRate(rate);
      }

      await product.save();
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Adding rate to comments took: ${end - start} ms`);
  }
};

addRateToProducts()
  .then(() => console.log("Adding rate to product successful"))
  .catch((error) => console.error(error));
