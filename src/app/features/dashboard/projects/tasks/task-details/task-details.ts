import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../../models/task';
import { ShowTask } from '../../../../task-comment/show-task/show-task';

@Component({
  selector: 'app-task-details',
  imports: [ShowTask],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected showPrioMenu = signal(false);
  protected selectedPrio = signal<string>('Low');
  protected allPriorities = signal(['High', 'Medium', 'Low']);

  protected showStatusMenu = signal(false);
  protected selectedStatus = signal<string>('IN REVIEW');
  protected allStatus = signal(['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']);

  protected task = signal<Task>({
    id: 'ESD-13',
    title: 'File Upload Service',
    description: `As a user,
I want to easily and securely upload files through the application,
so that I can share or store documents without errors or security risks.

Acceptance Criteria

✅ The file upload interface should be simple and intuitive for users.

✅ The system should validate file types (e.g., only allow PDF, DOCX, or image formats).

✅ The system should restrict file sizes to a defined limit (e.g., 10 MB).

✅ Users should see clear feedback during upload (e.g., progress indicator, success/failure message).

✅ Uploaded files should be stored securely and linked to the correct user or record.

✅ The system should handle upload errors gracefully (e.g., network issues, invalid file format).

✅ Users should be able to view or download their uploaded files after successful upload.`,
    status: 'DONE',
    dueDate: '9 November, 2025',
    overdue: false,
    assignee_id: 'Selina Addo',
    project_id: 'PRJ-007',
    priority: 'Medium',
  });

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
}
