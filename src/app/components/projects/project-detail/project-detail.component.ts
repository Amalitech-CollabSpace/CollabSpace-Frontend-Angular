import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  isLoading = false;
  error: string | null = null;
  projectId: string | null = null;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.loadProject();
    } else {
      this.error = 'Project ID not found';
    }
  }

  loadProject(): void {
    if (!this.projectId) return;

    this.isLoading = true;
    this.error = null;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load project. Please try again.';
        console.error('Error loading project:', err);
        this.isLoading = false;
        // TODO: Implement toast notification here
      }
    });
  }

  onEdit(): void {
    if (this.projectId) {
      this.router.navigate(['/dashboard/projects/edit', this.projectId]);
    }
  }
}

