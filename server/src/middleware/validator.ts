import { RequestHandler } from "express";
import * as yup from "yup";

export const newUserValidation: RequestHandler = (req, res, next) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(422).json({ error: "Invalid email!" });
  }

  if (!req.body.name || !req.body.name.trim()) {
    return res.status(422).json({ error: "Invalid name!" });
  }

  next();
};

export const signinValidation: RequestHandler = (req, res, next) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(422).json({ error: "Email is missing!" });
  }

  if (!req.body.password) {
    return res.status(422).json({ error: "Password is missing!" });
  }

  next();
};
