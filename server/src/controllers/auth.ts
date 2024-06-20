import UserModel from "@/models/user";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  await UserModel.create({ name, email, password });
  res.json({ success: true });
};

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found!" });

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched)
    return res.status(403).json({ error: "email/password doesn't match!" });

  const token = jwt.sign({ id: user._id.toString() }, "my_secret");
  res.json({ user: { name: user.name, email: user.email, token: token } });
};

export const sendPrivateRequest: RequestHandler = async (req, res) => {
  res.json({ message: "You are in private route" });
};

export const sendAdminRequest: RequestHandler = async (req, res) => {
  res.json({
    message: "You are in private which is only available for admin!",
  });
};
