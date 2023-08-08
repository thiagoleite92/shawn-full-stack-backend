import fastify from 'fastify';
import cors from '@fastify/cors';
import { healthRoutes } from '../routes/health';
import { githubRoutes } from '../routes/github';

export const app = fastify();

app.register(cors, {});

app.register(healthRoutes, {
  prefix: '/api/health',
});

app.register(githubRoutes, {
  prefix: '/api',
});
