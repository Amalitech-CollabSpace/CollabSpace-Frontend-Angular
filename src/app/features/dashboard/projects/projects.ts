import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../../core/services/projectService/project-service';
import { Project } from '../../../models/project.d';
import { toast } from 'ngx-sonner';
import { ButtonComponent } from '../../../components/button/button';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ButtonComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit, OnDestroy {
  protected allProjects = signal<Project[]>([]);
  protected filteredProjects = signal<Project[]>([]);
  protected isLoading = signal(false);
  protected error = signal<string | null>(null);
  protected activeFilter = signal<'all' | 'owned'>('all');
  protected userId = signal<string>('');
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly projectService: ProjectService) {
    this.userId.set(
      JSON.parse(localStorage.getItem('userDetails')!).id
    );
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected loadProjects(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.projectService
      .getProjects(this.userId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.allProjects.set(data);
          this.filterProjects(this.activeFilter());
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load projects. Please try again later.');
          console.log(err);
          toast.error('Failed to load projects', {
            description:
              err?.error?.message ||
              'An error occurred while loading projects.',
          });
          this.isLoading.set(false);
        },
      });
  }

  protected filterProjects(filter: 'all' | 'owned'): void {
    this.activeFilter.set(filter);

    if (filter === 'all') {
      this.filteredProjects.set([...this.allProjects()]);
    } else if (filter === 'owned') {
      this.filteredProjects.set(
        this.allProjects().filter(
          (project) => project.createdBy === this.userId()
        )
      );
    }
  }
}
