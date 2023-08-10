export type RepositoryType = {
  id: number;
  full_name: string;
  private: boolean;
  owner: { login: string };
  created_at: string;
  updated_at: string;
  clone_url: string;
  ssh_url: string;
  language: string;
};
