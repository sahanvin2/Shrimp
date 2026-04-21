import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  ELASTICSEARCH_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  B2_ENDPOINT: z.string().min(1).optional(),
  B2_ACCESS_KEY_ID: z.string().min(1).optional(),
  B2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
  B2_BUCKET: z.string().min(1).optional(),
  B2_REGION: z.string().min(1).optional(),
  B2_PUBLIC_BASE: z.string().min(1).optional(),
  CLIENT_URL: z.string().min(1),
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string().default('development'),
  FFMPEG_PATH: z.string().optional(),
});

export const env = schema.parse(process.env);
