import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../../models/task';
import { NgClass } from '@angular/common';
import { TaskComment } from '../task-comment/task-comment';
import { DisplayComments } from '../task-comment/task-show-comments/display-comments/display-comments';

@Component({
  selector: 'app-task-details',
  imports: [NgClass, TaskComment, DisplayComments],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  showPrioMenu = signal(false);
  selectedPrio = signal<string>('Low');
  allPriorities = signal(['High', 'Medium', 'Low']);

  showStatusMenu = signal(false);
  selectedStatus = signal<string>('IN REVIEW');
  allStatus = signal(['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']);

  task = signal<Task>({
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

  ngOnInit() {}

  togglePrioMenu() {
    this.showPrioMenu.update((open) => !open);
  }

  onSelectPrio(prio: string) {
    this.selectedPrio.set(prio);
    this.showPrioMenu.set(false);
  }

  toggleStatusMenu() {
    this.showStatusMenu.update((open) => !open);
  }

  onSelectStatus(stat: string) {
    this.selectedStatus.set(stat);
    this.showStatusMenu.set(false);
  }

  public receivedComment: string = '';
  public handleCommentFromChild(comment: string) {
    this.receivedComment = comment;
    this.dummyComments.push({
      name: 'New person',
      comment: comment,
    });
  }

  public dummyComments = [
    {
      name: 'Fynn Addo',
      comment: 'Hello there, mum',
    },
    {
      name: 'Noah Aqua',
      comment: 'Good job Michael',
    },
    {
      name: 'Angus Brown',
      comment: 'This is totally not acceptable or company policy',
    },
    {
      name: 'Mr Crabs',
      comment: 'Aye ayeeee',
    },
    {
      name: 'Michael Jackson Down',
      comment: 'Yee-hooo',
    },
  ];
}
