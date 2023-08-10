import { FastifyInstance } from 'fastify';
import { env } from '../env';
import { AxiosService } from '../services/axios';
import { z } from 'zod';
import getNextPageSinceId from '../utils/Regex';
import { GithubServices } from '../app/services/github';

const githubService = new GithubServices();

export const githubRoutes = async (app: FastifyInstance) => {
  app.get('/users', async (req, rep) => {
    const sinceParamsSchema = z.object({
      since: z.string().optional(),
    });

    try {
      const { since } = sinceParamsSchema.parse(req.query);

      const response = await AxiosService.get(
        `${env.GITHUB_API}/users?since=${since}&per_page=10`
      );

      const sinceId = getNextPageSinceId(response?.headers.link)
        ?.toString()
        .split('=')[1];

      return rep.send({
        list: response?.data,
        sinceId,
      });
    } catch (error: any) {
      return rep.status(error?.response?.status).send({
        message: error?.response?.statusText,
      });
    }
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

      return rep.send({ repos: await githubService.handleReposInfo(data) });
    } catch (error) {}
  });
};
