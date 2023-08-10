import { string } from 'zod';
import { RepositoryType } from '../../@types/Repository';

export class GithubServices {
  async handleReposInfo(array: any): Promise<Array<RepositoryType>> {
    return array?.map((repository: any) => ({
      id: repository?.id,
      fullname: repository?.full_name,
      private: repository?.private,
      owner: repository?.owner?.login,
      createdAt: repository?.created_at,
      updatedAt: repository?.updated_at,
      cloneUrl: repository?.clone_url,
      language: repository?.language,
    }));
  }
}
