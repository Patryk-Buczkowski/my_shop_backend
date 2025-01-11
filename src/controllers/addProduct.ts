import { Request, Response } from "express";

export const addProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
    const {} = req.body
    
  return res.status(201).json("Product added");
};
