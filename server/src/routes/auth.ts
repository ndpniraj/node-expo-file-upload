import {
  createUser,
  sendAdminRequest,
  sendPrivateRequest,
  signIn,
} from "@/controllers/auth";
import { newUserValidation, signinValidation } from "@/middleware/validator";
import UserModel from "@/models/user";
import { RequestHandler, Router } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const authRouter = Router();

declare global {
  namespace Express {
    interface Request {
      user: {
        [key: string]: any;
      };
      token: string;
    }
  }
}

const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split("Bearer ")[1];

    if (!token)
      return res.status(403).json({ error: "You are not authorized!" });

    const payload = jwt.verify(token, "my_secret") as { id: string };
    if (!payload.id)
      return res.status(403).json({ error: "You are not authorized!" });

    const user = await UserModel.findById(payload.id);
    if (!user)
      return res.status(403).json({ error: "You are not authorized!" });

    // it means user is authenticated
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ error: "You are not authorized!" });
    }

    res.status(500).json({ error: "Something went wrong!" });
  }
};

const isAdmin: RequestHandler = (req, res, next) => {
  const admin = req.user.role === "admin";
  if (admin) next();
  else res.status(403).json({ error: "Protected only for admin!" });
};

authRouter.post("/signup", newUserValidation, createUser);
authRouter.post("/signin", signinValidation, signIn);
authRouter.get("/private", isAuth, sendPrivateRequest);
authRouter.get("/admin", isAuth, isAdmin, sendAdminRequest);

export default authRouter;
