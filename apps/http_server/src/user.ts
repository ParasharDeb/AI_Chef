import express, { Router } from "express"
const userrouter:Router=express.Router();
userrouter.post("/signup",(req,res)=>{
    res.send("hi")
})
export default userrouter