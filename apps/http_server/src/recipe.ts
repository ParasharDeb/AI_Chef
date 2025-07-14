import express, { Router } from "express"
const reciperouter:Router= express.Router();
reciperouter.post("/addrecipe",(req,res)=>{
    res.send("reciperouter")
})
export default reciperouter