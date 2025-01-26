import mongoose from "mongoose";
import Products from "../src/schemas/productsSchema";
import Comments from "../src/schemas/commentSchema";
import dotenv from "dotenv";
import { CommentType } from "../src/types/productType";
dotenv.config();

const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const joinCommentsWithPoducts = async () => {
  const start = performance.now();
  try {
    const products = await Products.find();

    for (const product of products) {
      const comments = await Comments.find({ productId: product._id });
      const comentsIds = comments.map((comment) => comment._id as CommentType);

      product.comments = comentsIds;

      await product.save();
    }

    console.log("comments are added");
  } catch (error) {
    console.error({ message: "error in adding comments", error });
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Adding took: ${(end - start).toFixed(2)} ms`);
  }
};

joinCommentsWithPoducts();
