import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Comment from "../src/schemas/commentSchema";
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

const generateRandomComments = async () => {
  const start = performance.now();
  try {
    const products = await Product.find();
    const productIds = products.map((product) => product._id);

    for (const productId of productIds) {
      const CommentsToInsert = Array.from({ length: 10 }, () => {
        return {
          comment: faker.lorem.sentence(),
          userId: new mongoose.Types.ObjectId(),
          productId,
        };
      });

      await Comment.insertMany(CommentsToInsert);
    }

    console.log("Losowe komentarze zostały dodane.");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Adding comment took: ${(end - start).toFixed(2)} ms`);
  }
};

generateRandomComments()
  .then(() => console.log("generate comments successful"))
  .catch((err) => console.error(err));
