import { z } from "zod";
import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV ?? 'development'}` })

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
    REDIS_QUEUE_DB: z.coerce.number().default(1),
    REDIS_CACHE_DB: z.coerce.number().default(2),
    REDIS_USERNAME: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development")
})

export const env = envSchema.parse(process.env);

export type EnvSchema = z.infer<typeof envSchema> 