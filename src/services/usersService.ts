import { UserType } from "src/types/userType.js";
import User from "../schemas/user";

export const createUser = async (user: UserType) => {
  const newUser = new User({
    ...user,
    role: "user",
  });

  try {
    await newUser.save();
    console.log("newUser", newUser);
    //tutaj mail
  } catch (error) {
    console.error(error);
  }

  return newUser;
};
