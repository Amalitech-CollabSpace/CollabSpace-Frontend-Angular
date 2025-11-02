import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../../models/task';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [NgClass],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  task = signal<Task>({
    id: 'ESD-13',
    title: 'File Upload Service',
    description: `The goal of this task is to create a seamless and secure user authentication experience. 
    This includes a user-friendly registration form with validation, 
    a straightforward login page, and a reliable password recovery mechanism.`,
    status: 'DONE',
    dueDate: '9 Oct',
    overdue: false,
    assignee_id: 'Selina Addo',
    project_id: 'PRJ-007',
    priority: 'Medium',
  });

  ngOnInit() {}
}
