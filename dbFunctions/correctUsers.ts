import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/schemas/userSchema";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const correctUsers = async () => {
  const start = performance.now();

  try {
    const users = await User.find();

    for (const user of users) {
      user.verified = true;
      user.isActive = false;
      user.verificationToken = "null";
      user.tokenCreatedAt = null;
      user.tokenExpiration = null;

      await user.save();
    }
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Correction took: ${end - start} ms`);
  }
};

correctUsers()
  .then(() => console.log("Correction done 👍"))
  .catch(() => console.log("correction error ❌"));
