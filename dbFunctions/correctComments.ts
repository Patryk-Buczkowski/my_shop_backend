import mongoose from "mongoose";
import dotenv from "dotenv";
import Comment from "../src/schemas/commentSchema";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const correctComments = async () => {
  const start = performance.now();

  try {
    await Comment.updateMany(
      {},
      {
        $set: {
          userId: new mongoose.Types.ObjectId("6793b2f98e74d1a4bbb01c1f"),
        },
      },
    );
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Correction took: ${end - start} ms`);
  }
};

correctComments()
  .then(() => console.log("Correction done 👍"))
  .catch(() => console.log("correction error ❌"));
