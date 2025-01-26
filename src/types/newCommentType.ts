import { Types } from "mongoose";

export type NewCommentType = {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  comment: string;
};
