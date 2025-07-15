import express, { Router } from "express"
import axios from "axios";
import { api_key } from "@repo/backend-common/config";
const airouter:Router=express.Router();
airouter.get("/chat",async(req,res)=>{
  const userMessage = req.body.message;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192", // You can also try "mixtral-8x7b-32768"
      messages: [
        { role: "system", content: "You are a helpful recipe assistant." },
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

export default airouter