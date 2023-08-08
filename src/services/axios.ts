import { env } from '../env';
import axios from 'axios';
export class AxiosService {
  baseURL = env.GITHUB_API;

  constructor() {
    axios.create({
      baseURL: this.baseURL,
      headers: {
        accept: 'application/vnd.github+json',
        Authorization: `token ${env.GITHUB_API_TOKEN}`,
      },
    });
  }

  static get(url: string): Promise<any> {
    return axios.get(url);
  }
}
