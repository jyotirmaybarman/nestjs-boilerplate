import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    DB_TYPE: z.enum(["postgres", "mysql"]).default("postgres"),
    DB_DATABASE: z.string(),
    DB_HOST: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    PORT: z.coerce.number().default(3000),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_USERNAME: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
})

export const env = envSchema.parse(process.env);

export function validate(env: Record<string, unknown>){
    return envSchema.parse(env);
}

export type EnvSchema = z.infer<typeof envSchema> 