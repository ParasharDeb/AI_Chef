import express, { Router } from "express"
import axios from "axios";
import { api_key } from "@repo/backend-common/config";
const airouter:Router=express.Router();
airouter.get("/recipe",async(req,res)=>{
  const userMessage = req.body.message;
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a helpful recipe assistant. Give a list of ingredients they would need to make it and make your answer in bullet points and the way to make the recipe said ahead" },
        { role: "user", content: userMessage },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.json({ reply: response.data.choices[0].message.content });
});
airouter.get("/chat",async(req,res)=>{
    const userMessage=req.body.message;
    const response= await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
    
    {
        model: "mixtral-8x7b-32768",
    
    messages:[
        {role :"system",content:"You are a helpful doubt solver for a chef. the user will come and ask you questions about their cooking and you have to give them answers based on their problems"},
        {role :"user",content:userMessage}
    ],
    },
    {
        headers:{
            Authorization:`Bearer ${api_key}`,
            "Content-Type":"application/json",
        },
    }
);
})

export default airouter