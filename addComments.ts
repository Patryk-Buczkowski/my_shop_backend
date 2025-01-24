import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Comment from "./src/schemas/commentSchema";
import dotenv from "dotenv";
dotenv.config();
const { COSMOS_DB_CONNECTION_STRING = '' } = process.env;

const productIds = [
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c04") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c05") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c06") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c07") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c08") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c09") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0a") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0b") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0c") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0d") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0e") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c0f") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c10") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c11") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c12") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c13") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c14") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c15") },
  { _id: new mongoose.Types.ObjectId("6793afe48e74d1a4bbb01c16") },
];

await mongoose.connect(COSMOS_DB_CONNECTION_STRING);

export const generateRandomComments = async () => {
  const start = performance.now();
  for (const productId of productIds) {
    for (let i = 0; i < 50; i++) {
      const comment = new Comment({
        comment: faker.lorem.sentence(),
        userId: new mongoose.Types.ObjectId(),
        productId,
      });

      await comment.save();
    }
  }

  console.log("Losowe komentarze zostały dodane.");
  mongoose.connection.close();
  const end = performance.now();
  console.log(`Adding comment took: ${(end - start).toFixed(2)} ms`);
};

generateRandomComments().catch(err => console.error(err));
