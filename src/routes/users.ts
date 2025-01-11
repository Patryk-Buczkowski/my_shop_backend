import express from "express";
import { addUser } from "../controllers/addUser";

const userRouter = express.Router();

userRouter.post('/addUser', addUser);

export default userRouter;
