import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../core/services/projectService/project.service';
import { Project } from '../../../models/project.model';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from '../../button/button.component';
import { ProjectCard } from "../../project-card/project-card";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ButtonComponent, ProjectCard],
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
    this.userId = JSON.parse(localStorage.getItem('userDetails')!).id || 'mock-user-id';
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

    this.projectService.getProjects(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allProjects = data;
          console.log("All projects..", this.allProjects)
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

