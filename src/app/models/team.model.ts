export interface TeamRequest {
  name: string;
  description?: string;
}

export interface Team {
  id: string; // UUID
  name: string;
  description?: string;
  createdAt?: string; // ISO date format
  updatedAt?: string; // ISO date format
}


