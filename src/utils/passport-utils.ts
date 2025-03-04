import passport from "passport";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import User from "../schemas/userSchema";
import { Request } from "express";

dotenv.config();

const secret = process.env.SECRET;
const extractCookie = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const params = {
  secretOrKey: secret,
  jwtFromRequest: extractCookie,
};

const Strategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
// const params = {
//   secretOrKey: secret,
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

passport.use(
  "roleUser",
  new Strategy(params, async (payload, done) => {
    console.log(params.jwtFromRequest);
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: "Not authorized" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  "roleAdmin",
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user || user.role !== "admin") {
        return done(null, false, {
          message: "Not authorized role, admin required",
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.use(
  "roleModerator",
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user || !(user.role === "admin" || user.role === "moderator")) {
        return done(null, false, {
          message: "Not authorized role, moderator or admin required",
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
