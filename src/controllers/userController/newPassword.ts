import { RequestHandler } from "express";
import { getUserByToken, resetPassAndSend } from "services/usersService";

export const newPassword: RequestHandler<{
  verificationToken: string;
}> = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await getUserByToken(verificationToken);

    if (user.tokenExpiration < new Date()) {
      res.status(400).json({ error: "Token has expired" });
      return;
    }

    if (!user) {
      res.status(404).json("There is no such user");
      // res.redirect()   when front ready
      return;
    }

    user.tokenCreatedAt = null;
    user.tokenExpiration = null;
    await user.save();

    const correct = await resetPassAndSend(user);

    if (correct) {
      res.json("Password changed");
    } else {
      res.status(400).json("Wrong data");
    }

    // res.redirect()   when front ready
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
