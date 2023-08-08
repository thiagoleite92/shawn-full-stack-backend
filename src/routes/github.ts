import { FastifyInstance } from 'fastify';
import { env } from '../env';
import { AxiosService } from '../services/axios';
import { z } from 'zod';

export const githubRoutes = async (app: FastifyInstance) => {
  app.get('/users/:user', async (req, rep) => {
    try {
      const paramsSchema = z.object({
        user: z.string(),
      });

      const { user } = paramsSchema.parse(req.params);

      const { data } = await AxiosService.get(
        `${env.GITHUB_API}/users/${user}`
      );
      return rep.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/users', async (req, rep) => {
    const { data } = await AxiosService.get(`${env.GITHUB_API}/users`);
    console.log(data);

    return rep.send(data);
  });
};
