type SortBy =
  | "price:asc"
  | "price:desc"
  | "name:asc"
  | "name:desc"
  | "rating:asc"
  | "rating:desc";

export type FilterProductType = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortBy;
};