import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { Project } from '../../../models/project.model';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ButtonComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit, OnDestroy {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  error: string | null = null;
  activeFilter: 'all' | 'owned' = 'all';
  userId: string;
  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService) {
    this.userId = localStorage.getItem('user_id') || 'mock-user-id';
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.error = null;

    const memberId = localStorage.getItem('user_id') || undefined;

    this.projectService.getProjects(memberId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.allProjects = data;
          this.filterProjects(this.activeFilter);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load projects. Please try again later.';
          toast.error('Failed to load projects', {
            description: err?.error?.message || 'An error occurred while loading projects.'
          });
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

