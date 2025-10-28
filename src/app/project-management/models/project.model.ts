export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  owner: string;
  members: string[];
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  members?: string[];
}
