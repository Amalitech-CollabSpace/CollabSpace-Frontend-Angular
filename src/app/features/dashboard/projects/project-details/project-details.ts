import { CommonModule, SlicePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { bootstrapPersonAdd } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { DadTable } from '../../../../components/dad-table/dad-table';
import { InvitePopup } from '../../../../components/invite-popup/invite-popup';
import { Board } from '../../../../components/board/board';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { Task } from '../../../../models/task';
import { toast } from 'ngx-sonner';
import { TaskService } from '../../../../core/services/taskService/task-service';
import { Project } from '../../../../models/project.d';
import { ProjectService } from '../../../../core/services/projectService/project-service';
import { ButtonComponent } from '../../../../components/button/button';

@Component({
  selector: 'app-project-details',
  imports: [
    NgIcon,
    MatTabsModule,
    SlicePipe,
    DadTable,
    RouterLink,
    InvitePopup,
    Board,
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  viewProviders: provideIcons({ bootstrapPersonAdd }),
})
export class ProjectDetails implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);
  protected projectId = signal<string>(this.route.snapshot.paramMap.get('id')!);
  protected isEditMode = signal(false);
  protected taskId = signal<string>('');
  protected isLoading = signal(false);
  protected project = signal<Project | null>(null);
  protected error = signal<string | null>(null);
  private readonly destroy$ = new Subject<void>();
  protected tasks = signal<Task[]>([]);

  protected members = [
    'https://i.pravatar.cc/30?img=1',
    'https://i.pravatar.cc/30?img=2',
    'https://i.pravatar.cc/30?img=3',
    'https://i.pravatar.cc/30?img=4',
    'https://i.pravatar.cc/30?img=5',
    'https://i.pravatar.cc/30?img=6',
  ];

  constructor(
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) {
    router.events.subscribe(() => {
      this.projectId.set(this.route.snapshot.paramMap.get('id')!);
    });
    if (this.projectId()) {
      this.loadTasks();
      this.loadProject();
    }
  }

  ngOnInit(): void {
    this.routeSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadTasks();
        this.loadProject();
      });
  }

  protected onEditProject(): void {
    if (this.projectId()) {
      this.router.navigate(['/dashboard/projects/edit', this.projectId()]);
    }
  }

  protected loadTasks(): void {
    if (!this.projectId()) return;

    this.isLoading.set(true);

    this.taskService
      .getAllTasksByProject(this.projectId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks: Task[]) => {
          this.tasks.set(tasks);
          this.isLoading.set(false);
        },
        error: (err) => {
          toast.error('Failed to load task', {
            description:
              err?.error?.message ||
              'An error occurred while loading all project tasks.',
          });
          this.isLoading.set(false);
        },
      });
  }

  protected loadProject(): void {
    if (!this.projectId()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.projectService
      .getProjectById(this.projectId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.project.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load project. Please try again.');
          toast.error('Failed to load project', {
            description:
              err?.error?.message ||
              'An error occurred while loading the project.',
          });
          this.isLoading.set(false);
        },
      });
  }

  protected createTask() {
    this.router.navigate(['/dashboard/projects/task/create', this.projectId()]);
  }

  protected handleView(task: Task) {
    this.router.navigate([`/dashboard/projects/task/${task.id}`]);
  }

  protected handleEdit(task: Task) {
    this.router.navigate([`/dashboard/projects/task/edit/${task.id}`]);
  }

  protected handleDelete(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: (res) => {
        toast.success('Task deleted successfully');
        window.location.reload();
      },
      error: (err) => {
        toast.success('Task deleted successfully');
      },
    });
  }

  protected onDeleteProject() {
    this.projectService.deleteProject(this.projectId()).subscribe({
      next: (res) => {
        toast.success('Project deleted successfully');
        this.router.navigate(['/dashboard/projects']);
      },
      error: (err) => {
        toast.error("Couldn't delete this project");
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
