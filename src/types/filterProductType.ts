type SortBy =
  | "price_asc"
  | "price_desc"
  | "title_asc"
  | "title_desc"
  | "rating_asc"
  | "rating_desc";

export type FilterProductType = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  title?: string;
  pageNr?: string;
  limit?: string;
  sortBy?: SortBy | Array<SortBy>;
};
