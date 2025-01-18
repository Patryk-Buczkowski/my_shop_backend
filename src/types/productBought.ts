import { Types } from 'mongoose'; 

export type ProductBought = {
  product: Types.ObjectId;  
  amount: number;     
};