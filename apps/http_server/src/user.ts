import express, { Router } from "express"
import { SignupSchema,SigninSchema } from "./types";
import { prismaclient } from "@repo/db/client";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../../packages/backend_common/src";
const userrouter:Router=express.Router();
userrouter.post("/signup", async (req, res) => {
  const parseddata = SignupSchema.safeParse(req.body);
  if (!parseddata.success) {
    return res.status(400).json({
      message: "Invalid Input"
    });
  }
  const { username, email, password } = parseddata.data;
  try {
    const user = await prismaclient.user.create({
      data: {
        username,
        email,
        password
      }
    });
  } catch (err) {
    res.status(411).json({
      message: "Email already exists"
    });
  }
});
userrouter.post("/signin", async (req, res) => {
  const parseddata = SigninSchema.safeParse(req.body);
  if (!parseddata.success) {
    res.json({
      message: "Invalid credentials"
    });
    return;
  }
  const user = await prismaclient.user.findFirst({
    where: {
      email: parseddata.data.email,
      password: parseddata.data.password
    }
  });
  if (!user) {
    res.json({
      message: "User not found"
    });
    return;
  }
  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET
  );
  res.json({ token:token });
});
export default userrouter