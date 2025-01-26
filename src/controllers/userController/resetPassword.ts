import { RequestHandler } from "express";
import User from "schemas/userSchema";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { sendConfirmResetPasswordEmail } from "utils/nodemailer-utils";
dotenv.config();

export const requestResetPassword: RequestHandler<
  {},
  {},
  { email: string }
> = async (req, res) => {
  try {
    const { email } = req.body;
    const verificationToken = nanoid();

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json("incorrect e-mail");
    }

    user.verificationToken = verificationToken;
    user.tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // confirm reset pssword in mail
    sendConfirmResetPasswordEmail(user);
    res.json("Reset password mail sent");
    // const correct = await resetPassAndSend(email, user);

    // if (correct) {
    //   res.status(201).json("password changed");
    // } else {
    //   res.status(400).json("token id and user id are not the same");
    // }
  } catch (error) {
    console.error(error);
  }
};
