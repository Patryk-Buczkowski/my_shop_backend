import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.ts";
import User from "./src/schemas/userSchema.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.COSMOS_DB_CONNECTION_STRING || "";
// const dbName = process.env.DB_NAME || "db-contacts";

const startServer = async () => {
  try {
    await mongoose.connect(
      uriDb,
      // {dbName}
    );
    console.log("Database connection successful");
    await User.createIndexes();
    console.log("Indexes created for User model");
    app.listen(PORT, () => {
      console.log(`
        Server running port: ${PORT}
        `);
    });
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

startServer();
