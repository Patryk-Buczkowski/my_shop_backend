import { RequestHandler } from "express";
import { getUserByToken } from "services/usersService";

export const verifyUser: RequestHandler = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const findedUser = await getUserByToken(verificationToken);
    if (!findedUser) {
      res.status(404).json("There is no such user");
    }

    findedUser.verificationToken = "null";
    findedUser.verified = true;

    await findedUser.save();

    res.status(200).json("User verified");
  } catch (error) {
    console.error(error);
  }
};
