import express, { Request, Response, Router } from "express"
import { RecipeSchme } from "./types";
import { prismaclient } from "@repo/db/client";
import { middleware } from "./middleware";
const reciperouter:Router= express.Router();
interface Authrequest extends Request{
    userId?:string
}
reciperouter.post("/addrecipe",middleware,async(req:Authrequest,res:Response)=>{
    const parseddata=RecipeSchme.safeParse(req.body)
    const userId=req.userId 
    if(!parseddata.success){
        res.json({
            message:"Invalid Input"
        })
        return;
    }
    if(!userId){
        res.json({
            message:"You are not authorized"
        })
        return 
    }
    await prismaclient.recipe.create({
        data:{
            Description:parseddata.data?.description,
            Title:parseddata.data.title,
            ImageUrl:parseddata.data.imageurl,
            userId:userId
        }
    })
    res.json({
        message:"Recipe added succesfully"
    })
})
reciperouter.get("/allrecipes",middleware,async(req,res)=>{
    const recipes = await prismaclient.recipe.findMany()
    res.json(
        recipes
    )
})
reciperouter.get("/myrecipes",middleware,async(req:Authrequest,res:Response)=>{
    const userId= req.userId
    const recipes = await prismaclient.recipe.findMany({
        where:{
            userId:userId
        }
    })
    res.json(recipes)
})
reciperouter.get("/search", async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ message: "Missing search query" });
    return;
  }

  try {
    const recipes = await prismaclient.recipe.findMany({
      where: {
        OR: [
          {
            Title: {
              contains: query,
              mode: 'insensitive', // case-insensitive search
            },
          },
          {
            Description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error searching recipes", error });
  }
});

export default reciperouter