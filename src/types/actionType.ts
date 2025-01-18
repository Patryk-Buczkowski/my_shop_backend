import { Types } from "mongoose";

export type ActionType = {
  weddingDate: string;
  divorce: string;
  userId: Types.ObjectId;
};
