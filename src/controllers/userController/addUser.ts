import { RequestHandler } from "express";
import User from "../../schemas/userSchema";
import { createUser } from "../../services/usersService.js";
import { UserType } from "../../types/userType";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export const addUser: RequestHandler<{}, any, UserType> = async (
  req,
  res,
): Promise<any> => {
  const { name, age, email, password, country } = req.body;

  const start = performance.now();
  const hashedPassword = bcrypt.hashSync(password, 11);
  const end = performance.now();
  const verificationToken = nanoid();

  console.log(`Hashing took: ${(end - start).toFixed(2)} ms`);
  console.log("hashedPassword s11", hashedPassword);

  const newUser: UserType = {
    verified: false,
    isActive: false,
    role: "user",
    productsBought: [],
    name,
    age,
    email,
    password: hashedPassword,
    verificationToken,
    country,
  };
  try {
    const exist = await User.findOne({ email: newUser.email });

    if (exist) {
      res.status(400).json("email exist in data base");
      return;
    }
    const user = await createUser(newUser);

    res.status(201).json({
      message: "User added correctly",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: "Create User error", error });
  }
};
