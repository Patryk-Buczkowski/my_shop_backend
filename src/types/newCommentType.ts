import { Types } from "mongoose";

export type NewCommentType = {
    productId: Types.ObjectId;
    id: string;
    userId: Types.ObjectId;
    comment: string;
}