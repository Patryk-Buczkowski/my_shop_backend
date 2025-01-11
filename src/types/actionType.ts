import { ObjectId } from "mongoose";

export type ActionType = {
  weddingDate: string;
  divorce: string;
  userId: ObjectId;
};
