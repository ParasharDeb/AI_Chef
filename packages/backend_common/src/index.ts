import * as dotenv from "dotenv";
import path from "path";

// Manually load .env from backend_common
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
export const api_key = process.env.API_KEY || "fallback_groq_key";
