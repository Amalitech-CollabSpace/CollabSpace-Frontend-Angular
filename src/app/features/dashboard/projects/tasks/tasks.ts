import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionSave } from '@ng-icons/ionicons';

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
  protected taskForm: FormGroup;
  protected attachments = signal<{ name: string; size: string }[]>([]);

  constructor(private readonly fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      status: ['TODO'],
      dueDate: [''],
      overdue: [false],
      assigneeId: [''],
      projectId: ['', [Validators.required]],
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
    const newFileData = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }));

    this.attachments.update(prev => [...prev, ...newFileData]);

    const currentFiles = this.taskForm.get('attachments')?.value || [];
    this.taskForm.patchValue({
      attachments: [...currentFiles, ...files],
    });

    input.value = '';
  }

 protected  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form submitted:', this.taskForm.value);
    } else {
      console.log('Form invalid');
      this.taskForm.markAllAsTouched();
    }
  }
}
