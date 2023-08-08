import fastify from 'fastify';
import { healthRoutes } from '../routes/health';
import { githubRoutes } from '../routes/github';

export const app = fastify();

app.register(healthRoutes, {
  prefix: '/api/health',
});

app.register(githubRoutes, {
  prefix: '/api',
});
