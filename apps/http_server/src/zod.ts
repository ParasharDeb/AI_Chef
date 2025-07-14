import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string(),
    email: z.string().email()
});

export default SignupSchema