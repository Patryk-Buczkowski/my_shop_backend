import { ObjectId } from 'mongodb'; // Import ObjectId z biblioteki MongoDB, jeśli korzystasz z tej biblioteki

export type ProductBought = {
  product: ObjectId;  // Zmieniono 'string' na 'ObjectId', ponieważ zazwyczaj referencje w MongoDB to ObjectId
  amount: number;     // Możesz dodać walidację, aby 'amount' było większe niż 0
};