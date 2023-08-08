import { FastifyInstance } from 'fastify';
import { env } from '../env';
import { AxiosService } from '../services/axios';
import { z } from 'zod';

export const githubRoutes = async (app: FastifyInstance) => {
  app.get('/users', async (req, rep) => {
    const sinceParamsSchema = z.object({
      since: z.string().optional(),
    });

    try {
      const { since } = sinceParamsSchema.parse(req.query);

      const response = await AxiosService.get(
        `${env.GITHUB_API}/users?since=${since}`
      );

      return rep.send({
        list: response?.data,
        nextLink: response?.headers.link,
      });
    } catch (error) {}
  });

  app.get('/users/:username/details', async (req, rep) => {
    const userParamsSchema = z.object({
      username: z.string(),
    });

    try {
      const { username } = userParamsSchema.parse(req.params);

      const { data } = await AxiosService.get(
        `${env.GITHUB_API}/users/${username}`
      );
      return rep.send({ user: data });
    } catch (error) {}
  });

  app.get('/users/:username/repos', async (req, rep) => {
    const userParamsSchema = z.object({
      username: z.string(),
    });

    try {
      const { username } = userParamsSchema.parse(req.params);

      const { data } = await AxiosService.get(
        `${env.GITHUB_API}/users/${username}/repos?type=owner&sort=updated`
      );
      return rep.send({ user: data });
    } catch (error) {}
  });
};
