import { CommonModule, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bootstrapPersonAdd } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { DadTable } from '../../../../components/dad-table/dad-table';
import { InvitePopup } from '../../../../components/invite-popup/invite-popup';
import { Board } from '../../../../components/board/board';
import { Subject, takeUntil } from 'rxjs';
import { Task } from '../../../../models/task';
import { toast } from 'ngx-sonner';
import { TaskService } from '../../../../core/services/taskService/task-service';
import { Project } from '../../../../models/project.d';
import { ProjectService } from '../../../../core/services/projectService/project-service';
import { ProjectDetailComponent } from "../../../../components/project-detail/project-detail";

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
    ProjectDetailComponent
],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  viewProviders: provideIcons({ bootstrapPersonAdd }),
})
export class ProjectDetails {
  route = inject(ActivatedRoute);
  taskService = inject(TaskService);
  projectId: any = this.route.snapshot.paramMap.get('id');
  isEditMode = false;
  taskId: string | null = null;
  isLoading = signal(false);
  project: Project | null = null;
  error: string | null = null;
  private destroy$ = new Subject<void>();
  tasksdummy: Task[] = [];
  tasks = [
    {
      id: 'ESD-1',
      title: 'User Authentication',
      status: 'DONE',
      dueDate: '10 Oct',
      overdue: false,
      assignee_id: 'D1',
      project_id: 'PRJ-001',
      priority: 'High',
    }
  ];

  members = [
    'https://i.pravatar.cc/30?img=1',
    'https://i.pravatar.cc/30?img=2',
    'https://i.pravatar.cc/30?img=3',
    'https://i.pravatar.cc/30?img=4',
    'https://i.pravatar.cc/30?img=5',
    'https://i.pravatar.cc/30?img=6',
  ];

  constructor(private projectService: ProjectService, private router: Router) {
    router.events.subscribe(() => {
      this.projectId = this.route.snapshot.paramMap.get('id');
    });
    this.loadTasks();
  }

  onEditProject(): void {
    if (this.projectId) {
      this.router.navigate(['/dashboard/projects/edit', this.projectId]);
    }
  }

  loadTasks(): void {
    if (!this.projectId) return;

    this.isLoading.set(true);

    this.taskService
      .getAllTasksByProject(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tasks: any) => {
          this.tasksdummy = tasks;
          console.log(this.tasksdummy);
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

  loadProject(): void {
    if (!this.projectId) return;

    this.isLoading.set(true);
    this.error = null;

    this.projectService
      .getProjectById(this.projectId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.project = data;
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error = 'Failed to load project. Please try again.';
          toast.error('Failed to load project', {
            description:
              err?.error?.message ||
              'An error occurred while loading the project.',
          });
          this.isLoading.set(false);
        },
      });
  }

  handleView(task: Task) {
    this.router.navigate([`/dashboard/projects/task/${task.id}`]);
  }

  handleEdit(task: Task) {
    this.router.navigate([`/dashboard/projects/task/edit/${task.id}`]);
  }

  handleDelete(task: Task) {
    return;
  }
}