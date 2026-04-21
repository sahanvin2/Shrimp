import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env.js';

export const storageClient = new S3Client({
  region: env.B2_REGION || 'us-east-005',
  endpoint: env.B2_ENDPOINT,
  credentials: env.B2_ACCESS_KEY_ID && env.B2_SECRET_ACCESS_KEY
    ? {
        accessKeyId: env.B2_ACCESS_KEY_ID,
        secretAccessKey: env.B2_SECRET_ACCESS_KEY,
      }
    : undefined,
  forcePathStyle: true,
});
