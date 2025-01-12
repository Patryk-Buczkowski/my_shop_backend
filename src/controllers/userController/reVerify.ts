import { RequestHandler } from "express-serve-static-core";
import { reSendMail } from "services/usersService";

export const reVerify: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) res.status(400).json("You should provide email");

  try {
    const user = reSendMail(email);

    if (!user) {
      res.status(404).json("There is no such user");
      return;
    }
    res.status(200).json("Resend email");
  } catch (error) {
    console.error(error);
  }
};
