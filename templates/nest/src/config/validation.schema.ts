import z from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().min(1024).max(65535),
    )
    .default(8080),

  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z
    .preprocess((a) => parseInt(z.string().parse(a), 10), z.number().positive())
    .default(5432),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_URL: z.string().nonempty(),

  MONGO_URI: z.string().nonempty(),

  JWT_SECRET: z.string().nonempty(),

  REDIS_HOST: z.string().nonempty(),
});

export type Env = z.infer<typeof EnvSchema>;
