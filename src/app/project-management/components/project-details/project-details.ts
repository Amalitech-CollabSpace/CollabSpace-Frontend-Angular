import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetailsComponent {
  project = signal<Project | null>(null);
  newMemberEmail = signal('');
  
  // Computed properties
  isOwner = computed(() => {
    const project = this.project();
    return project?.owner === 'john.doe@example.com'; // Mock current user
  });

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Load project when route params change
    effect(() => {
      const projectId = this.route.snapshot.paramMap.get('id');
      if (projectId) {
        const project = this.projectService.getProjectById(projectId);
        this.project.set(project || null);
      }
    });
  }

  onEditProject() {
    const project = this.project();
    if (project) {
      this.router.navigate(['/projects', project.id, 'edit']);
    }
  }

  onDeleteProject() {
    const project = this.project();
    if (project && confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(project.id);
      this.router.navigate(['/projects']);
    }
  }

  onAddMember() {
    const project = this.project();
    const email = this.newMemberEmail().trim();
    
    if (project && email && this.isOwner()) {
      const success = this.projectService.addMember(project.id, email);
      if (success) {
        this.newMemberEmail.set('');
        // Refresh project data
        const updatedProject = this.projectService.getProjectById(project.id);
        this.project.set(updatedProject || null);
      } else {
        alert('Failed to add member. They might already be a member.');
      }
    }
  }

  onRemoveMember(memberEmail: string) {
    const project = this.project();
    
    if (project && this.isOwner()) {
      const success = this.projectService.removeMember(project.id, memberEmail);
      if (success) {
        // Refresh project data
        const updatedProject = this.projectService.getProjectById(project.id);
        this.project.set(updatedProject || null);
      }
    }
  }
}
