import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  error: string | null = null;
  activeFilter: 'all' | 'owned' = 'all';
  userId: string;

  constructor(private projectService: ProjectService) {
    this.userId = localStorage.getItem('user_id') || 'mock-user-id';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.error = null;

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.allProjects = data;
        this.filterProjects(this.activeFilter);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again later.';
        console.error('Error loading projects:', err);
        this.isLoading = false;
      }
    });
  }

  filterProjects(filter: 'all' | 'owned'): void {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredProjects = [...this.allProjects];
    } else if (filter === 'owned') {
      this.filteredProjects = this.allProjects.filter(
        project => project.createdBy === this.userId
      );
    }
  }
}

