import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["development", "production", "test"]).default("development"),
  VITE_API_URL: z.string().default("http://localhost:4000"),
  VITE_SERVICE_VERSION: z.string().default("1.0.0"),
});

export const env = envSchema.parse(import.meta.env);
