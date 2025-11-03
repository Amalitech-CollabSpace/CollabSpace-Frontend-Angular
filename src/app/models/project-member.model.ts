export enum ProjectMemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export interface ProjectMemberRequest {
  projectId: string; // UUID
  userId: string; // UUID
  role?: ProjectMemberRole;
}

export interface ProjectMember {
  id: string; // UUID
  projectId: string; // UUID
  userId: string; // UUID
  role: ProjectMemberRole;
  joinedAt?: string; // ISO date format
  createdAt?: string; // ISO date format
  updatedAt?: string; // ISO date format
}

