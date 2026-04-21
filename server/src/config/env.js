import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  ELASTICSEARCH_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  CLIENT_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string().default('development'),
  FFMPEG_PATH: z.string().optional(),
});

export const env = schema.parse(process.env);
