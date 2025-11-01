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
  projects: Project[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.error = null;

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again later.';
        console.error('Error loading projects:', err);
        this.isLoading = false;
        // TODO: Implement toast notification here
      }
    });
  }
}

