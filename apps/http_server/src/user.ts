import express, {  Response, Router ,Request} from "express"
import { SignupSchema,SigninSchema, UpdateSchema } from "./types";
import { prismaclient } from "@repo/db/client";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
const userrouter:Router=express.Router();
userrouter.post("/signup", async (req, res) => {
  const parseddata = SignupSchema.safeParse(req.body);
  if (!parseddata.success) {
    return res.status(400).json({
      message: "Invalid Input"
    });
  }

  const hashedpassword = await bcrypt.hash(parseddata.data.password,10)
  try {
    const user = await prismaclient.user.create({
      data: {
        username:parseddata.data?.username,
        email:parseddata.data.email,
        password:hashedpassword
      }
    });
  } catch (err) {
    res.status(411).json({
      message: "Email already exists"
    });
  }
  res.json({
    message:"you have signed up"
  })
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
    }
  });
  if (!user) {
    res.json({
      message: "User not found"
    });
    return;
  }
  const checkedpassword= bcrypt.compare(parseddata.data.password,user.password)
  if(!checkedpassword){
    res.json({
      message:"incorrect password"
    })
  }
  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET
  );
  res.json({ token:token });
});
interface Authrequest extends Request{
  userId?:string
}
userrouter.get("/profile",middleware,async(req:Authrequest,res:Response)=>{
  const userId= req.userId 
  if(!userId){
    res.json({
      message:"Unauthorized"
    })
  }
  const user = await prismaclient.user.findUnique({
    where:{
      id:userId
    }
  })
  if(!user){
    res.json({
      message:"user not found"
    })
  }
  res.json({
    user
  })
})

userrouter.put("/update", async (req: Authrequest, res: Response) => {
  const parseddata = UpdateSchema.safeParse(req.body);
  const userId = req.userId;

  if (!userId) {
    res.json({ message: "you are not authorized" });
    return;
  }

  if (!parseddata.success) {
    res.json({ message: "Invalid input" });
    return;
  }

  const hashedPassword = await bcrypt.hash(parseddata.data.newpassword, 10);

  const user = await prismaclient.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  if (!user) {
    res.json({ message: "incorrect password" });
    return;
  }

  res.json({ message: "Your password has been changed" });
});

export default userrouter