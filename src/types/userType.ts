import { ProductBought } from "./productBought";

export type UserType = {
  name: string;
  age: number;
  email: string;
  password: string;
  country: "PL" | "US" | "DE" | "UK" | "FR";
  isActive?: boolean;
  role?: "user" | "admin" | "moderator";
  productsBought: ProductBought[];
};
