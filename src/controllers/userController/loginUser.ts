import { RequestHandler } from "express";
import { generateAccToken, validateUser } from "services/usersService";

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);

  try {
    const user = await validateUser(email, password);

    if (!user) {
      res.status(401).json("wrong email or password");
      return;
    }

    const token = generateAccToken(user._id, user.role);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { email },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
