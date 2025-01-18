import { RequestHandler } from "express";
import User from "schemas/userSchema";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createNewPassword } from "services/usersService";
import { sendNewPassword } from "utils/nodemailer-utils";

export const resetPassword: RequestHandler<{}, {}, { email: string }> = async (
  req,
  res
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json("there is no such user");
    }

    const newPass = crypto.randomUUID();
    const hashedNewPass = bcrypt.hashSync(newPass, 11);

    await createNewPassword(email, hashedNewPass);
    await sendNewPassword(user, newPass);

    res.status(201).json("password changed");
  } catch (error) {
    console.error(error);
  }
};
