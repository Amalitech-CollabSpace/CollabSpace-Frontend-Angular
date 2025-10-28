export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}
