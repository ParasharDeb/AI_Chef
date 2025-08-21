import express from "express";
import userrouter from "./user";
import reciperouter from "./recipe";
import airouter from "./ai";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors())
const routes=express.Router();
app.use("/api/v1",routes)
routes.use("/user",userrouter),
routes.use("/recipe",reciperouter),
routes.use("/generate",airouter),
app.listen(3001);
