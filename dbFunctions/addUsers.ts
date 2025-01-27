import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/schemas/userSchema";
import { countryObj } from "../src/types/countryType";
import { faker } from "@faker-js/faker";
import { RoleType } from "../src/types/roleType";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = "" } = process.env;

await mongoose
  .connect(COSMOS_DB_CONNECTION_STRING)
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });

const addUsers = async () => {
  const start = performance.now();
  const arrRole: RoleType[] = ["admin", "moderator", "user"];
  const arrayFromCountryObj = Array.from(Object.values(countryObj));

  try {
    const usersToInsert = Array.from({ length: 30 }, () => {
      const countryIndex = Math.floor(
        Math.random() * arrayFromCountryObj.length,
      );
      const roleIndex = Math.floor(Math.random() * arrRole.length);

      return {
        age: Math.floor(Math.random() * 101 + 18),
        country: arrayFromCountryObj[countryIndex],
        isActive: false,
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        productsBought: [],
        role: arrRole[roleIndex],
        tokenCreatedAt: null,
        tokenExpiration: null,
        verificationToken: "null",
        verified: true,
      };
    });

    await User.insertMany(usersToInsert);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    const end = performance.now();
    console.log(`Adding users took: ${(end - start).toFixed(2)} ms`);
  }
};

addUsers()
  .then(() => console.log("Adding users done 👍"))
  .catch(() => console.log("Adding users error ❌"));
