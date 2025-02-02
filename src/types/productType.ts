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
  category?: CategoryType;
  commentsList?: CommentType[];
  updateAverageRate?: (newRate: number) => Promise<void>;
  pictureUrl: string;
};

export type CategoryType =
  | "food"
  | "drinks"
  | "meat"
  | "dairy products"
  | "household goods"
  | "household chemicals"
  | "cosmetics"
  | "bio food"
  | "snacks"
  | "confectionery"
  | "seafood"
  | "frozen food"
  | "baked goods"
  | "fruits and vegetables"
  | "beverages"
  | "pet supplies"
  | "baby products"
  | "health supplements"
  | "electronics"
  | "personal hygiene"
  | "stationery"
  | "home decor"
  | "other";

export type CommentType = {
  comment: string;
  userId: Types.ObjectId;
  productId: Types.ObjectId;
};
