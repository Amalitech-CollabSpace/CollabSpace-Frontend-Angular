import { Component, signal, input, output, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectFormComponent {
  // Input signals for project data
  project = input<Project | null>(null);
  
  // Output signals for events
  projectSaved = output<Project>();
  cancelled = output<void>();

  // Form data
  formData = signal({
    name: '',
    description: '',
    owner: 'john.doe@example.com', // Mock current user
    members: [] as string[]
  });

  // Computed properties
  isEditing = computed(() => this.project() !== null);
  pageTitle = computed(() => this.isEditing() ? 'Edit Project' : 'Create Project');

  constructor(private projectService: ProjectService) {
    // Initialize form data when project input changes
    effect(() => {
      const project = this.project();
      if (project) {
        this.formData.set({
          name: project.name,
          description: project.description,
          owner: project.owner,
          members: [...project.members]
        });
      } else {
        this.formData.set({
          name: '',
          description: '',
          owner: 'john.doe@example.com',
          members: []
        });
      }
    });
  }

  // Helper methods for template
  updateName(value: string) {
    this.formData.update(data => ({ ...data, name: value }));
  }

  updateDescription(value: string) {
    this.formData.update(data => ({ ...data, description: value }));
  }

  updateOwner(value: string) {
    this.formData.update(data => ({ ...data, owner: value }));
  }

  onSubmit() {
    const data = this.formData();
    
    if (this.isEditing()) {
      // Update existing project
      const project = this.project()!;
      const updateRequest: UpdateProjectRequest = {
        name: data.name,
        description: data.description,
        members: data.members
      };
      
      const updatedProject = this.projectService.updateProject(project.id, updateRequest);
      if (updatedProject) {
        this.projectSaved.emit(updatedProject);
      }
    } else {
      // Create new project
      const createRequest: CreateProjectRequest = {
        name: data.name,
        description: data.description,
        owner: data.owner,
        members: data.members
      };
      
      const newProject = this.projectService.createProject(createRequest);
      this.projectSaved.emit(newProject);
    }
  }

  onCancel() {
    this.cancelled.emit();
  }

  addMember() {
    const memberEmail = prompt('Enter member email:');
    if (memberEmail && memberEmail.trim()) {
      const currentMembers = this.formData().members;
      if (!currentMembers.includes(memberEmail.trim())) {
        this.formData.update(data => ({
          ...data,
          members: [...data.members, memberEmail.trim()]
        }));
      }
    }
  }

  removeMember(memberEmail: string) {
    this.formData.update(data => ({
      ...data,
      members: data.members.filter(member => member !== memberEmail)
    }));
  }
}
