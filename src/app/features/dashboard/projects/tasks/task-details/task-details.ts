import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../../models/task';
import { TaskService } from '../../../../../core/services/taskService/task-service';
import { toast } from 'ngx-sonner';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../../components/button/button';
import { DatePipe, Location } from '@angular/common';
import { ShowTask } from '../../../../task-comment/show-task/show-task';

@Component({
  selector: 'app-task-details',
  imports: [ButtonComponent, DatePipe, ShowTask],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);
  private readonly location = inject(Location);
  protected showPrioMenu = signal(false);
  protected selectedPrio = signal<string>('Low');
  protected allPriorities = signal(['High', 'Medium', 'Low']);
  protected showStatusMenu = signal(false);
  protected selectedStatus = signal<string>('IN REVIEW');
  protected allStatus = signal(['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']);

  protected taskId = signal<string>('');
  protected isLoading = signal(false);
  private readonly destroy$ = new Subject<void>();

  protected task = signal<Task>({
    id: '',
    title: '',
    description: '',
    status: '',
    dueDate: '',
    overdue: false,
    assigneeId: '',
    project_id: '',
    priority: '',
  });

  ngOnInit(): void {
    this.taskId.set(this.route.snapshot.paramMap.get('id')!);
    if (this.taskId()) {
      this.loadTask();
    }
  }

  protected togglePrioMenu() {
    this.showPrioMenu.update((open) => !open);
  }

  protected onSelectPrio(prio: string) {
    this.selectedPrio.set(prio);
    this.showPrioMenu.set(false);
  }

  protected toggleStatusMenu() {
    this.showStatusMenu.update((open) => !open);
  }

  protected onSelectStatus(stat: string) {
    this.selectedStatus.set(stat);
    this.showStatusMenu.set(false);
  }

  protected loadTask(): void {
    if (!this.taskId) return;

    this.isLoading.set(true);

    this.taskService
      .getTask(this.taskId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task: Task) => {
          this.task.set(task);
          this.isLoading.set(false);
        },
        error: (err) => {
          toast.error('Failed to load task', {
            description:
              err?.error?.message ||
              'An error occurred while loading the task.',
          });
          this.isLoading.set(false);
        },
      });
  }

  protected handleEdit() {
    this.router.navigate([`/dashboard/projects/task/edit/${this.taskId()}`]);
  }

  protected handleDelete() {
    this.taskService.deleteTask(this.taskId()).subscribe({
      next: (res) => {
        toast.success('Task deleted successfully');
        this.location.back();
      },
      error: (err) => {
        toast.success('Task deleted successfully');
      },
    });
  }
}
