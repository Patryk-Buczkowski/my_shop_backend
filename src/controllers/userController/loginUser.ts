import { RequestHandler } from "express";
import { generateAccToken, validateUser } from "services/usersService";

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await validateUser(email, password);

    if (!user) {
      res.status(401).json("wrong email or password");
    }

    const token = generateAccToken(user._id, user.role);

    res.json({
      token,
      user: { email, password },
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
};
