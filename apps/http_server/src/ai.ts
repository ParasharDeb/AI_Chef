import express, { Router } from "express"
const airouter:Router=express.Router();
airouter.get("/chat",(req,res)=>{
    res.send("ai end point")
})
export default airouter