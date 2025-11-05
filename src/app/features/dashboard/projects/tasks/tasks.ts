import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    status: new FormControl('TODO', [Validators.required]),
    dueDate: new FormControl(''),
    overdue: new FormControl(false),
    assigneeId: new FormControl(''),
    projectId: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    attachments: new FormControl<string[]>([]),
  });

  attachments = signal<{ name: string; size: string }[]>([]);

  removeAttachment(index: number) {
    this.attachments().splice(index, 1);
    this.taskForm.value.attachments!.splice(index, 1);
    const mewList = this.taskForm.value.attachments || [];
    this.taskForm.patchValue({
      attachments: [...mewList],
    });
  }

  onSubmit() {
    console.log(this.taskForm.value);
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files);

    files.forEach((file: any) => {
    
 
      
      const attachment = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}`,
      };
      this.attachments().push(attachment);
      const current = this.taskForm.value.attachments || [];
      this.taskForm.patchValue({
        attachments: [...current, file],
      });
    });
  }
}
