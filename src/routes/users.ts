import express from "express";
import { addUser } from "../controllers/userController/addUser";
import { validateUser } from "validators/validateUser";
import { verifyUser } from "controllers/userController/verifyUser";
import { reVerify } from "controllers/userController/reVerify";
import { loginUser } from "controllers/userController/loginUser";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/addUser", validateUser, addUser);
userRouter.get("/verifyUser/:verificationToken", verifyUser);
userRouter.post("/verifyUser", reVerify);

export default userRouter;
