export enum ProjectMemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export interface ProjectMemberRequest {
  projectId: string; 
  userId: string; 
  role?: ProjectMemberRole;
}

export interface ProjectMember {
  id: string;
  projectId: string; 
  userId: string; 
  role: ProjectMemberRole;
  joinedAt?: string; 
  createdAt?: string; 
  updatedAt?: string;
}


