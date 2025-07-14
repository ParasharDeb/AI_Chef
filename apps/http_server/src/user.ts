import express, { Router } from "express"
import SignupSchema from "./zod";
import { prismaclient } from "@repo/db/client";
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
    res.json({ message: "User created", user });
  } catch (err) {
    res.status(411).json({
      message: "Email already exists"
    });
  }
  res.json({
    message:"you are signed up"
  })
});

export default userrouter