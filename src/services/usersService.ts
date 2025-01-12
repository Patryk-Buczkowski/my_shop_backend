import { UserType } from "../types/userType";
import User from "../schemas/user";
import { sendVerificationEmail } from "mailer/sendVerificationEmail";

export const createUser = async (user: UserType) => {
  const newUser = new User({
    ...user,
    role: "user",
  });

  try {
    await newUser.save();
    console.log("newUser", newUser);
    await sendVerificationEmail(newUser);
    console.log("mail sent");
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const getUserByToken = async (verificationToken: string) => {
  try {
    const user = await User.findOne({ verificationToken });
    console.log("verificationToken", verificationToken);
    if (user) {
      console.log("user located");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const reSendMail = async (email: string) => {
  try {
    const user = await User.findOne({ email, verified: false });
    
    if (user) {
      console.log("reSendMail user located");
    }

    await sendVerificationEmail(user);

    return user;
  } catch (error) {
    console.error(error);
  }
};
