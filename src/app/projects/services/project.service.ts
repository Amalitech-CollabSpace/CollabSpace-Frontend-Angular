import { Injectable } from '@angular/core';

export interface Project {
  id?: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() { }
  
  // Service will be implemented when actual API integration is needed
}

