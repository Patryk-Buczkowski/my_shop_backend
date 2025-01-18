import { Types } from "mongoose";

export type ProductType = {
  title: string;
  price: number;
  description: string;
  quantityAvailable?: number;
  rate: number;
  comments: CommentType[];
  averageRate: number;
  rateCount: number;
};

export type CommentType = {
  comment: string;
  id: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
};
