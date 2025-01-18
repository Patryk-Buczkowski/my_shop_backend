import { RequestHandler } from "express";
import { createNewPassword } from "services/usersService";

export const changePassord: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await createNewPassword(email, password);

    if (!user) {
      res.status(404).json("Can not find user");
    }

    console.log("password changed", user);

    res.json("password changed");
  } catch (error) {
    console.error(error);
  }
};
