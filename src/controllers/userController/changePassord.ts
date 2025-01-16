import { RequestHandler } from "express";
import User from "schemas/user";

export const changePassord: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );

    if (!user) {
      res.status(404).json("Can not find user");
    }

    res.json("passwor changed");
  } catch (error) {
    console.error(error);
  }
};
