import { RequestHandler } from "express";
import User from "schemas/userSchema";
import { resetPassAndSend } from "services/usersService";
import dotenv from "dotenv";
dotenv.config();

export const resetPassword: RequestHandler<{}, {}, { email: string }> = async (
  req,
  res
) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json("incorrect e-mail");
    }

    const correct = await resetPassAndSend(email, user);

    if (correct) {
      res.status(201).json("password changed");
    } else {
      res.status(400).json("token id and user id are not the same");
    }
  } catch (error) {
    console.error(error);
  }
};
