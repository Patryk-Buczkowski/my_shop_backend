import { RequestHandler } from "express";
import User from "schemas/userSchema";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  checkId,
  createNewPassword,
  getUserByToken,
} from "services/usersService";
import { sendNewPassword } from "utils/nodemailer-utils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
dotenv.config();

export const resetPassword: RequestHandler<{}, {}, { email: string }> = async (
  req,
  res
) => {
  try {
    const { email } = req.body;
    const secret = process.env.SECRET;
    const token = req.headers.authorization?.split(" ")[1];
    const jwtPayload = jwt.verify(token, secret) as {
      id: Types.ObjectId;
      email: string;
    };
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json("incorrect e-mail");
    }

    const correct = await checkId(user._id, jwtPayload.id, email, user);

    if (correct) {
      res.status(201).json("password changed");
    } else {
      res.status(400).json("token id and user id are not the same");
    }
  } catch (error) {
    console.error(error);
  }
};
