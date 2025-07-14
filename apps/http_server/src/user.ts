import express, { Router } from "express"
import SignupSchema from "./zod";

const userrouter:Router=express.Router();
userrouter.post("/signup",async(req,res)=>{
    const parseddata=SignupSchema.safeParse(req.body)
    if(!parseddata){
        res.json({
            message:"Invalid Input"
        })
        return
    }

    res.json({

    })
})
export default userrouter