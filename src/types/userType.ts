import { CountryType } from "./countryType";
import { ProductBought } from "./productBought";
import { ProductType } from "./productType";
import { RoleType } from "./roleType";

export type UserType = {
  name: string;
  age: number;
  email: string;
  password: string;
  country: CountryType;
  isActive: boolean;
  role: RoleType;
  verificationToken: string;
  productsBought: ProductBought[];
  productsBoughtList?: ProductType[];
  verified: boolean;
  imgLink: File;
  tokenCreatedAt?: Date | null;
  tokenExpiration?: Date | null;
};
