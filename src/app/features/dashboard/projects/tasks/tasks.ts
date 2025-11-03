import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSave } from '@ng-icons/ionicons';
import { TaskService } from '../../../../core/services/taskService/task-service';
import { toast } from 'ngx-sonner';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Task } from '../../../../models/task';

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
  styleUrl: './tasks.scss',

  viewProviders: provideIcons({ ionSave }),
})
export class Tasks {
  taskService = inject(TaskService);
  taskForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>(''),
    // status: new FormControl('TODO', [Validators.required]),
    dueDate: new FormControl<string>(''),
    // overdue: new FormControl(false),
    assigneeId: new FormControl<string>(''),
    projectId: new FormControl<string>('', [Validators.required]),
    priority: new FormControl<string>('', [Validators.required]),
    // attachments: new FormControl<string[]>([]),
  });
  route = inject(ActivatedRoute);
  isEditMode = false;
  taskId: string | null = null;
  isLoading = signal(false);
  private destroy$ = new Subject<void>();
  attachments = signal<{ name: string; size: string }[]>([]);

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask();
    }
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.isLoading.set(true);

    this.taskService
      .getTask(this.taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (task: Task) => {
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

  removeAttachment(index: number) {
    this.attachments().splice(index, 1);
    // this.taskForm.value.attachments!.splice(index, 1);
    // const mewList = this.taskForm.value.attachments || [];
    // this.taskForm.patchValue({
    //   attachments: [...mewList],
    // });
  }

  onSubmit() {
    this.isLoading.set(true);
    if (this.isEditMode) {
      this.taskService.editTask(this.taskForm.value as Task, this.taskId).subscribe({
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
      this.taskService.createTask(this.taskForm.value as Task).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          console.log(res);
          toast.success('Created successfully');
        },
        error: (err) => {
          this.isLoading.set(false);
          toast.error(err?.error?.error || err?.message || 'Unknown error');
        },
      });
    }
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files);

    files.forEach((file: any) => {
      // const reader = new FileReader();

      // reader.onload = () => {
      //   const attachment = {
      //     name: file.name,
      //     size: `${(file.size / 1024).toFixed(2)}`,
      //     data: reader.result as string,
      //   };
      //  this.attachments().push(attachment);
      //   const current = this.taskForm.value.attachments || [];
      //   this.taskForm.patchValue({
      //     attachments: [...current, attachment.data],
      //   });
      // };

      // reader.readAsDataURL(file);

      const attachment = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}`,
      };
      this.attachments().push(attachment);
      // const current = this.taskForm.value.attachments || [];
      // this.taskForm.patchValue({
      //   attachments: [...current, file],
      // });
    });
  }
}
