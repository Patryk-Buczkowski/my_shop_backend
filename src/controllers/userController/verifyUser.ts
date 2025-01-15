import { RequestHandler } from "express";
import { getUserByToken } from "services/usersService";

export const verifyUser: RequestHandler = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const findedUser = await getUserByToken(verificationToken);
    if (!findedUser) {
      res.status(404).json("There is no such user");
      // res.redirect()   when front ready
    }

    res.status(200).json("User verified");
    // res.redirect()   when front ready
  } catch (error) {
    console.error(error);
  }
};
