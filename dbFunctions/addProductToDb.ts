import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Product from "../src/schemas/productsSchema";
import { CategoryType } from "../src/types/productType";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

await mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const addProductToDb = async () => {
  const start = performance.now();
  const categories: CategoryType[] = [
    "food",
    "drinks",
    "meat",
    "dairy products",
    "household goods",
    "household chemicals",
    "cosmetics",
    "bio food",
    "snacks",
    "confectionery",
    "seafood",
    "frozen food",
    "baked goods",
    "fruits and vegetables",
    "beverages",
    "pet supplies",
    "baby products",
    "health supplements",
    "electronics",
    "personal hygiene",
    "stationery",
    "home decor",
    "other",
  ];

  try {
    const productsToAdd = Array.from({ length: 5000 }, () => {
      const categoriesIndex = Math.floor(Math.random() * categories.length);

      return {
        averageRate: 0,
        comments: [],
        description: faker.lorem.sentences(),
        price: +faker.finance.amount({ min: 1, max: 900 }),
        rate: [],
        rateCount: 0,
        title: faker.lorem.words({ min: 3, max: 6 }),
        category: categories[categoriesIndex],
      };
    });

    await Product.insertMany(productsToAdd);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Adding products took: ${(end - start).toFixed(2)} ms`);
  }
};

addProductToDb()
  .then(() => console.log("Adding products done 👍"))
  .catch(() => console.log("Adding products error ❌"));
