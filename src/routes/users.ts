import express from "express";
import { addUser } from "../controllers/userController/addUser";
import { validateUser } from "validators/validateUser";
import { verifyUser } from "controllers/userController/verifyUser";
import { reVerify } from "controllers/userController/reVerify";
import { loginUser } from "controllers/userController/loginUser";
import { requestResetPassword } from "controllers/userController/resetPassword";
import passport from "passport";
import { changePassord } from "controllers/userController/changePassord";
import { newPassword } from "controllers/userController/newPassword";
import { validateNewPassword } from "validators/validateNewPassword";
import { getUser } from "controllers/userController/getUser";
import multer from "multer";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "my_shop",
    format: "webp",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/addUser", upload.single("imgLink"), validateUser, addUser);
userRouter.get("/verifyUser/:verificationToken", verifyUser);
userRouter.post("/verifyUser", reVerify);
userRouter.get("/resetPassword", requestResetPassword);

userRouter.get(
  "/user/:userId",
  // passport.authenticate("roleUser", { session: false }),
  getUser,
);

// userRouter.get("/resetPssword/:verificationToken", resetForm); this route for frontend

userRouter.get("/resetPassword/:verificationToken", newPassword);

userRouter.post(
  "/changePassword",
  passport.authenticate("roleUser", { session: false }),
  validateNewPassword,
  changePassord,
);

export default userRouter;
