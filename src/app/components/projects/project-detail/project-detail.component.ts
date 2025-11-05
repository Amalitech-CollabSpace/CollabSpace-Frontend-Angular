import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { Project } from '../../../models/project.model';
import { ButtonComponent } from '../../button/button.component';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ButtonComponent],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project | null = null;
  isLoading = false;
  error: string | null = null;
  projectId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('projectId', JSON.stringify(this.projectId)) 
    if (this.projectId) {
      this.loadProject();
    } else {
      this.error = 'Project ID not found';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProject(): void {
    if (!this.projectId) return;

    this.isLoading = true;
    this.error = null;

    this.projectService.getProjectById(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {
        this.project = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load project. Please try again.';
        toast.error('Failed to load project', {
          description: err?.error?.message || 'An error occurred while loading the project.'
        });
        this.isLoading = false;
      }
    });
  }

  onEdit(): void {
    if (this.projectId) {
      this.router.navigate(['/dashboard/projects/edit', this.projectId]);
    }
  }

  onMemberInvited(): void {
    // Refresh project data or member list if needed
    if (this.projectId) {
      this.loadProject();
    }
  }
}

