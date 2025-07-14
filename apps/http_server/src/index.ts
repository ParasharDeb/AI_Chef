import express from "express";
const app = express();
app.use(express.json());
app.get("/signup",(req,res)=>{
    res.send("singup");
})
app.get("/login",(req,res)=>{
    res.send("login");
})

app.listen(3001);
