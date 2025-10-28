import { Injectable } from "@angular/core";
import { Project } from "../models/project.model";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  private projects: Project[] = [];

  constructor() {}

  // CRUD operations
  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.push(newProject);
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates, updatedAt: new Date() };
      return this.projects[index];
    }
    return null;
  }

  deleteProject(id: string): boolean {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      return true;
    }
    return false;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
