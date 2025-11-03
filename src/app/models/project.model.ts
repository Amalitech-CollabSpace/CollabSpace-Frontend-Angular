export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export interface ProjectRequest {
  name: string;
  description: string;
  start_date: string; // ISO date format
  end_date: string; // ISO date format
}

export interface Project {
  id: string; // UUID
  name: string;
  description: string;
  startDate: string; // ISO date format
  endDate: string; // ISO date format
  status: ProjectStatus;
  teamId: string; // UUID
  createdBy: string; // UUID
}
