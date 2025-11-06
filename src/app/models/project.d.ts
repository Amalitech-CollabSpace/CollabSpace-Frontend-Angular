export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export interface ProjectRequest {
  name: string;
  description: string;
  start_date: string;
  end_date: string; 
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string; 
  endDate: string; 
  status: ProjectStatus;
  teamId?: string; 
  createdBy: string;
}
