import { Injectable, signal, computed } from '@angular/core';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Angular signals for state management
  private projectsSignal = signal<Project[]>([]);
  
  // Computed signals
  public readonly projects = this.projectsSignal.asReadonly();
  
  // Mock current user (in real app, this would come from auth service)
  private currentUser = 'john.doe@example.com';

  constructor() {
    // Initialize with some mock data
    this.initializeMockData();
  }

  // Computed signal for projects owned by current user
  public readonly ownedProjects = computed(() => 
    this.projectsSignal().filter(project => project.owner === this.currentUser)
  );

  // CRUD Operations
  createProject(request: CreateProjectRequest): Project {
    const newProject: Project = {
      id: this.generateId(),
      name: request.name,
      description: request.description,
      owner: request.owner,
      members: request.members,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.projectsSignal.update(projects => [...projects, newProject]);
    return newProject;
  }

  getProjectById(id: string): Project | undefined {
    return this.projectsSignal().find(project => project.id === id);
  }

  updateProject(id: string, request: UpdateProjectRequest): Project | null {
    const project = this.getProjectById(id);
    if (!project) return null;

    const updatedProject: Project = {
      ...project,
      ...request,
      updatedAt: new Date()
    };

    this.projectsSignal.update(projects => 
      projects.map(p => p.id === id ? updatedProject : p)
    );
    
    return updatedProject;
  }

  deleteProject(id: string): boolean {
    const project = this.getProjectById(id);
    if (!project) return false;

    this.projectsSignal.update(projects => 
      projects.filter(p => p.id !== id)
    );
    
    return true;
  }

  // Member management
  addMember(projectId: string, memberEmail: string): boolean {
    const project = this.getProjectById(projectId);
    if (!project || project.members.includes(memberEmail)) return false;

    return this.updateProject(projectId, {
      members: [...project.members, memberEmail]
    }) !== null;
  }

  removeMember(projectId: string, memberEmail: string): boolean {
    const project = this.getProjectById(projectId);
    if (!project || !project.members.includes(memberEmail)) return false;

    return this.updateProject(projectId, {
      members: project.members.filter(member => member !== memberEmail)
    }) !== null;
  }

  // Helper methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private initializeMockData(): void {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete redesign of the company website',
        owner: this.currentUser,
        members: ['jane.smith@example.com', 'bob.johnson@example.com'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Building a new mobile application for iOS and Android',
        owner: 'jane.smith@example.com',
        members: [this.currentUser, 'alice.brown@example.com'],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
      },
      {
        id: '3',
        name: 'Database Migration',
        description: 'Migrating from MySQL to PostgreSQL',
        owner: this.currentUser,
        members: ['charlie.davis@example.com'],
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-12')
      }
    ];

    this.projectsSignal.set(mockProjects);
  }
}
