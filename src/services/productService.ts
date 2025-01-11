import Product from "../schemas/products";
import { ProductType } from "../types/productType";

export const createProduct = async (product: ProductType) => {
  const newProduct = new Product({ ...product });

  try {
    await newProduct.save();
    console.log('newProduct', newProduct)
    return newProduct;
  } catch (error) {
    console.error('Can not create product', error)
  }
};
