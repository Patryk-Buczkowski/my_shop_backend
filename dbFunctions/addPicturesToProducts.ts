import mongoose from "mongoose";
import pLimit from "p-limit";
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

const getPhoto = async () => {
  const response = await fetch("https://picsum.photos/400/400?random=12345");

  return response.url;
};

const addPicturesToProducts = async () => {
  const start = performance.now();
  try {
    const products = await Product.find();
    const limit = pLimit(5);
    const urlArr = await Promise.all(
      products.map(() => limit(() => getPhoto())),
    );

    const updatePromises = products.map((product, index) =>
      Product.updateOne(
        { _id: product._id },
        { $set: { pictureUrl: urlArr[index] } },
      ),
    );

    const results = await Promise.all(updatePromises);
    console.log(`Updated ${results.length} products.`);
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
