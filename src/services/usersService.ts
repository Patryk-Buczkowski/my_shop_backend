import { UserType } from "../types/userType";
import User from "../schemas/user";
import { sendVerificationEmail } from "utils/nodemailer-utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Types } from "mongoose";
dotenv.config();

export const createUser = async (user: UserType) => {
  const newUser = new User({
    ...user,
    role: "user",
  });

  try {
    await newUser.save();
    console.log("newUser", newUser);
    await sendVerificationEmail(newUser);
    console.log("mail sent");
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByToken = async (verificationToken: string) => {
  try {
    const user = await User.findOne({ verificationToken });
    console.log("verificationToken", verificationToken);
    if (user) {
      console.log("user located");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const reSendMail = async (email: string) => {
  try {
    const user = await User.findOne({ email, verified: false });

    if (user) {
      console.log("reSendMail user located");
    }

    await sendVerificationEmail(user);

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.verified) {
    throw new Error("User is not verified");
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("User password do not match");
  }

  return user;
};

export const generateAccToken = (id: Types.ObjectId, role: string) => {
  return jwt.sign({ id, role }, process.env.SECRET, { expiresIn: "10d" });
};
