export interface TeamRequest {
  name: string;
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}


