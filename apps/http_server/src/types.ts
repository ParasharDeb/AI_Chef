import { z } from "zod";

export const  SignupSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string(),
    email: z.email()
});
export const SigninSchema =z.object({
    email:z.email(),
    password:z.string()
})

export const UpdateSchema=z.object({
    oldpassword:z.string(),
    newpassword:z.string()
})
export const RecipeSchme =z.object({
    title:z.string().max(50),
    description:z.string().max(1000),
    imageurl:z.string()
})