import { Types } from "mongoose";

export type ProductType = {
  title: string;
  price: number;
  description: string;
  quantityAvailable?: number;
  rate: number[];
  comments: CommentType[];
  averageRate: number;
  rateCount: number;
  commentsList?: CommentType[];
  updateAverageRate: (newRate: number) => Promise<void>;
};

export type CommentType = {
  comment: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
};
