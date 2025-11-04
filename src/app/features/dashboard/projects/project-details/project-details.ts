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
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../../../core/services/projectService/project.service';
import { ProjectDetailComponent } from "../../../../components/projects/project-detail/project-detail.component";

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
    },
    {
      id: 'ESD-2',
      title: 'Reset Password Module',
      status: 'IN PROGRESS',
      dueDate: '11 Oct',
      overdue: true,
      assignee_id: 'E1',
      project_id: 'PRJ-001',
      priority: 'Medium',
    },
    {
      id: 'ESD-3',
      title: 'Email Verification',
      status: 'DONE',
      dueDate: '9 Oct',
      overdue: false,
      assignee_id: 'A1',
      project_id: 'PRJ-001',
      priority: 'Low',
    },
    {
      id: 'ESD-4',
      title: 'Implement Dashboard UI',
      status: 'IN REVIEW',
      dueDate: '14 Oct',
      overdue: false,
      assignee_id: 'B2',
      project_id: 'PRJ-002',
      priority: 'High',
    },
    {
      id: 'ESD-5',
      title: 'Database Optimization',
      status: 'IN PROGRESS',
      dueDate: '18 Oct',
      overdue: true,
      assignee_id: 'C1',
      project_id: 'PRJ-002',
      priority: 'High',
    },
    {
      id: 'ESD-6',
      title: 'Notification Service',
      status: 'TODO',
      dueDate: '21 Oct',
      overdue: false,
      assignee_id: 'D3',
      project_id: 'PRJ-003',
      priority: 'Medium',
    },
    {
      id: 'ESD-7',
      title: 'Payment Gateway Integration',
      status: 'DONE',
      dueDate: '15 Oct',
      overdue: false,
      assignee_id: 'E2',
      project_id: 'PRJ-004',
      priority: 'High',
    },
    {
      id: 'ESD-8',
      title: 'Analytics Dashboard',
      status: 'IN REVIEW',
      dueDate: '17 Oct',
      overdue: false,
      assignee_id: 'F1',
      project_id: 'PRJ-004',
      priority: 'Low',
    },
    {
      id: 'ESD-9',
      title: 'Profile Page Redesign',
      status: 'IN PROGRESS',
      dueDate: '19 Oct',
      overdue: true,
      assignee_id: 'A3',
      project_id: 'PRJ-005',
      priority: 'Medium',
    },
    {
      id: 'ESD-10',
      title: 'Implement Role Management',
      status: 'DONE',
      dueDate: '8 Oct',
      overdue: false,
      assignee_id: 'B1',
      project_id: 'PRJ-005',
      priority: 'High',
    },
    {
      id: 'ESD-11',
      title: 'Task Scheduling Service',
      status: 'TODO',
      dueDate: '22 Oct',
      overdue: false,
      assignee_id: 'C2',
      project_id: 'PRJ-006',
      priority: 'Low',
    },
    {
      id: 'ESD-12',
      title: 'Real-Time Chat Feature',
      status: 'IN PROGRESS',
      dueDate: '16 Oct',
      overdue: true,
      assignee_id: 'D2',
      project_id: 'PRJ-007',
      priority: 'High',
    },
    {
      id: 'ESD-13',
      title: 'File Upload Service',
      status: 'DONE',
      dueDate: '9 Oct',
      overdue: false,
      assignee_id: 'E3',
      project_id: 'PRJ-007',
      priority: 'Medium',
    },
    {
      id: 'ESD-14',
      title: 'Search Optimization',
      status: 'IN REVIEW',
      dueDate: '18 Oct',
      overdue: false,
      assignee_id: 'F2',
      project_id: 'PRJ-008',
      priority: 'Low',
    },
    {
      id: 'ESD-15',
      title: 'API Documentation Update',
      status: 'TODO',
      dueDate: '25 Oct',
      overdue: false,
      assignee_id: 'A2',
      project_id: 'PRJ-009',
      priority: 'Low',
    },
    {
      id: 'ESD-16',
      title: 'Error Logging Integration',
      status: 'IN PROGRESS',
      dueDate: '20 Oct',
      overdue: true,
      assignee_id: 'B3',
      project_id: 'PRJ-010',
      priority: 'High',
    },
    {
      id: 'ESD-17',
      title: 'Project Archival Module',
      status: 'DONE',
      dueDate: '12 Oct',
      overdue: false,
      assignee_id: 'C3',
      project_id: 'PRJ-010',
      priority: 'Medium',
    },
    {
      id: 'ESD-18',
      title: 'Automated Backup System',
      status: 'IN REVIEW',
      dueDate: '19 Oct',
      overdue: false,
      assignee_id: 'D4',
      project_id: 'PRJ-011',
      priority: 'High',
    },
    {
      id: 'ESD-19',
      title: 'Dark Mode Implementation',
      status: 'TODO',
      dueDate: '28 Oct',
      overdue: false,
      assignee_id: 'E4',
      project_id: 'PRJ-012',
      priority: 'Medium',
    },
    {
      id: 'ESD-20',
      title: 'Performance Benchmark Tests',
      status: 'DONE',
      dueDate: '13 Oct',
      overdue: false,
      assignee_id: 'F3',
      project_id: 'PRJ-012',
      priority: 'High',
    },
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
        next: (tasks: Task[]) => {
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

  handleView(task: any) {
    this.router.navigate([`/dashboard/projects/task/${task.id}`]);
  }

  handleEdit(task: any) {
    this.router.navigate([`/dashboard/projects/task/edit/${task.id}`]);
  }

  handleDelete(task: any) {
    return;
  }
}
