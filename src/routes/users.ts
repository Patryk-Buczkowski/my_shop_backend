import express from "express";
import { addUser } from "../controllers/userController/addUser";
import { validateUser } from "validators/validateUser";
import { verifyUser } from "controllers/userController/verifyUser";
import { reVerify } from "controllers/userController/reVerify";
import { loginUser } from "controllers/userController/loginUser";
import { resetPassword } from "controllers/userController/resetPassword";
import passport from "passport";
import { changePassord } from "controllers/userController/changePassord";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/addUser", validateUser, addUser);
userRouter.get("/verifyUser/:verificationToken", verifyUser);
userRouter.post("/verifyUser", reVerify);
userRouter.post(
  "/resetPssword",
  passport.authenticate("roleUser", { session: false }),
  resetPassword
);
userRouter.post(
  "/changePassword",
  passport.authenticate("roleUser", { session: false }),
  changePassord
);

export default userRouter;
