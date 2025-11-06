import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSave } from '@ng-icons/ionicons';
import { Task } from '../../../../models/task';
import { TaskService } from '../../../../core/services/taskService/task-service';
import { toast } from 'ngx-sonner';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DecimalPipe,
    NgIcon,
  ],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  viewProviders: provideIcons({ ionSave }),
})
export class Tasks {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  protected taskForm: FormGroup;
  protected attachments = signal<{ name: string; size: string }[]>([]);
  protected projectId = signal<string>('');
  protected taskId = signal<string>('');
  protected isLoading = signal(false);
  protected isEditMode = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {
    if (this.router.url.includes('edit/')) {
      this.taskId.set(this.route.snapshot.paramMap.get('id')!);
      if (this.taskId()) {
        this.isEditMode.set(true);
        this.loadTask();
      }
    }
    this.projectId.set(this.route.snapshot.paramMap.get('id')!);
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['TODO'],
      dueDate: [''],
      overdue: [false],
      assigneeId: [''],
      projectId: [this.projectId(), [Validators.required]],
      priority: [''],
      attachments: this.fb.control<File[]>([]),
    });
  }

  protected removeAttachment(index: number) {
    const updatedAttachments = this.attachments().filter((_, i) => i !== index);
    this.attachments.set(updatedAttachments);

    const currentFiles = this.taskForm.get('attachments')?.value || [];
    const newFiles = currentFiles.filter((_: any, i: number) => i !== index);
    this.taskForm.patchValue({ attachments: newFiles });
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const files = Array.from(input.files);
    const newFileData = files.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }));

    this.attachments.update((prev) => [...prev, ...newFileData]);

    const currentFiles = this.taskForm.get('attachments')?.value || [];
    this.taskForm.patchValue({
      attachments: [...currentFiles, ...files],
    });

    input.value = '';
  }

  protected onSubmit() {
    this.taskForm.patchValue({ projectId: this.projectId() });
    if (this.taskForm.valid) {
      this.isLoading.set(true);
      if (this.isEditMode()) {
        this.taskService
          .editTask(this.taskForm.value as Task, this.taskId())
          .subscribe({
            next: (res) => {
              this.isLoading.set(false);
              console.log(res);
              toast.success('Edited successfully');
            },
            error: (err) => {
              this.isLoading.set(false);
              toast.error(err?.error?.error || err?.message || 'Unknown error');
            },
          });
      } else {
        this.taskForm.patchValue({ projectId: this.projectId() });
        this.taskService.createTask(this.taskForm.value as Task).subscribe({
          next: (res) => {
            this.isLoading.set(false);
            console.log(res);
            toast.success('Created successfully');
            this.router.navigate(['/dashboard/projects', this.projectId()])
          },
          error: (err) => {
            this.isLoading.set(false);
            console.log(err);
            toast.error(err?.error?.error || err?.message || 'Unknown error');
          },
        });
      }
    } else {
      console.log('Form invalid');
      this.taskForm.markAllAsTouched();
    }
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.isLoading.set(true);

    this.taskService
      .getTask(this.taskId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task: any) => {
          this.taskForm.patchValue({
            title: task.title ?? '',
            description: task.description ?? '',
            dueDate: task.dueDate ?? '',
            priority: task.priority ?? '',
          });
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
}
