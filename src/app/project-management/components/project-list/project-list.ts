import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectListComponent {
  // Filter options
  filterOptions = ['All', 'Owned by me'];
  selectedFilter = signal('All');

  constructor(private projectService: ProjectService) {}

  // Computed signals for filtered projects
  filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'Owned by me') {
      return this.projectService.ownedProjects();
    }
    return this.projectService.projects();
  });

  onFilterChange(filter: string) {
    this.selectedFilter.set(filter);
  }

  onDeleteProject(projectId: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId);
    }
  }
}
