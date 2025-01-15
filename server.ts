import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.COSMOS_DB_CONNECTION_STRING || "";
// const dbName = process.env.DB_NAME || "db-contacts";

const startServer = async () => {
  try {
    await mongoose.connect(uriDb,
      // {dbName}
    );
    console.log(`Database connection successful`);
    app.listen(PORT, () => {
      console.log(`
        Server running. Use our API on port: ${PORT}
        http://localhost:3000/my_shop_api
        `);
    });
  } catch (err) {
    console.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

startServer();
