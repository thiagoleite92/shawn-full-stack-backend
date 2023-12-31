import { config } from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  });
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(3333),
  GITHUB_API: z.string(),
  GITHUB_API_TOKEN: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment vars', _env.error.format());

  throw new Error('Invalid environment vars');
}

export const env = _env.data;
