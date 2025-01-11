import { Request, Response } from "express";
import User from "../schemas/user";
import { createUser } from "../services/usersService.js";
import { UserType } from "src/types/userType";

export const addUser = async (req: Request, res: Response): Promise<any> => {
  const { name, age, email, password, country } = req.body;

  const newUser: UserType = {
    productsBought: [],
    name,
    age,
    email,
    password,
    country,
  };
  try {
    const exist = await User.findOne({ email: newUser.email });

    if (exist) {
      return res.status(400).json("email exist in data base");
    }
    const user = await createUser(newUser);

    return res.status(201).json({
      message: "User added correctly",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: "Create User error", error });
  }
};
