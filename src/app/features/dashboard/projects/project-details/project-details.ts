import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { bootstrapPersonAdd } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { DadTable } from "../../../../components/dad-table/dad-table";


@Component({
  selector: 'app-project-details',
  imports: [NgIcon, MatTabsModule, SlicePipe, DadTable, RouterLink],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss',
  viewProviders: provideIcons({ bootstrapPersonAdd }),
})
export class ProjectDetails {
  route = inject(ActivatedRoute);
  projectId: any = this.route.snapshot.paramMap.get('id');
  tasks = [
  { id: 'ESD-1', title: 'User Authentication', status: 'DONE', dueDate: '10 Oct', overdue: false, assignee_id: 'D1', project_id: 'PRJ-001', priority: 'High' },
  { id: 'ESD-2', title: 'Reset Password Module', status: 'IN PROGRESS', dueDate: '11 Oct', overdue: true, assignee_id: 'E1', project_id: 'PRJ-001', priority: 'Medium' },
  { id: 'ESD-3', title: 'Email Verification', status: 'DONE', dueDate: '9 Oct', overdue: false, assignee_id: 'A1', project_id: 'PRJ-001', priority: 'Low' },
  { id: 'ESD-4', title: 'Implement Dashboard UI', status: 'IN REVIEW', dueDate: '14 Oct', overdue: false, assignee_id: 'B2', project_id: 'PRJ-002', priority: 'High' },
  { id: 'ESD-5', title: 'Database Optimization', status: 'IN PROGRESS', dueDate: '18 Oct', overdue: true, assignee_id: 'C1', project_id: 'PRJ-002', priority: 'High' },
  { id: 'ESD-6', title: 'Notification Service', status: 'TODO', dueDate: '21 Oct', overdue: false, assignee_id: 'D3', project_id: 'PRJ-003', priority: 'Medium' },
  { id: 'ESD-7', title: 'Payment Gateway Integration', status: 'DONE', dueDate: '15 Oct', overdue: false, assignee_id: 'E2', project_id: 'PRJ-004', priority: 'High' },
  { id: 'ESD-8', title: 'Analytics Dashboard', status: 'IN REVIEW', dueDate: '17 Oct', overdue: false, assignee_id: 'F1', project_id: 'PRJ-004', priority: 'Low' },
  { id: 'ESD-9', title: 'Profile Page Redesign', status: 'IN PROGRESS', dueDate: '19 Oct', overdue: true, assignee_id: 'A3', project_id: 'PRJ-005', priority: 'Medium' },
  { id: 'ESD-10', title: 'Implement Role Management', status: 'DONE', dueDate: '8 Oct', overdue: false, assignee_id: 'B1', project_id: 'PRJ-005', priority: 'High' },
  { id: 'ESD-11', title: 'Task Scheduling Service', status: 'TODO', dueDate: '22 Oct', overdue: false, assignee_id: 'C2', project_id: 'PRJ-006', priority: 'Low' },
  { id: 'ESD-12', title: 'Real-Time Chat Feature', status: 'IN PROGRESS', dueDate: '16 Oct', overdue: true, assignee_id: 'D2', project_id: 'PRJ-007', priority: 'High' },
  { id: 'ESD-13', title: 'File Upload Service', status: 'DONE', dueDate: '9 Oct', overdue: false, assignee_id: 'E3', project_id: 'PRJ-007', priority: 'Medium' },
  { id: 'ESD-14', title: 'Search Optimization', status: 'IN REVIEW', dueDate: '18 Oct', overdue: false, assignee_id: 'F2', project_id: 'PRJ-008', priority: 'Low' },
  { id: 'ESD-15', title: 'API Documentation Update', status: 'TODO', dueDate: '25 Oct', overdue: false, assignee_id: 'A2', project_id: 'PRJ-009', priority: 'Low' },
  { id: 'ESD-16', title: 'Error Logging Integration', status: 'IN PROGRESS', dueDate: '20 Oct', overdue: true, assignee_id: 'B3', project_id: 'PRJ-010', priority: 'High' },
  { id: 'ESD-17', title: 'Project Archival Module', status: 'DONE', dueDate: '12 Oct', overdue: false, assignee_id: 'C3', project_id: 'PRJ-010', priority: 'Medium' },
  { id: 'ESD-18', title: 'Automated Backup System', status: 'IN REVIEW', dueDate: '19 Oct', overdue: false, assignee_id: 'D4', project_id: 'PRJ-011', priority: 'High' },
  { id: 'ESD-19', title: 'Dark Mode Implementation', status: 'TODO', dueDate: '28 Oct', overdue: false, assignee_id: 'E4', project_id: 'PRJ-012', priority: 'Medium' },
  { id: 'ESD-20', title: 'Performance Benchmark Tests', status: 'DONE', dueDate: '13 Oct', overdue: false, assignee_id: 'F3', project_id: 'PRJ-012', priority: 'High' },
];

  members = [
    'https://i.pravatar.cc/30?img=1',
    'https://i.pravatar.cc/30?img=2',
    'https://i.pravatar.cc/30?img=3',
    'https://i.pravatar.cc/30?img=4',
    'https://i.pravatar.cc/30?img=5',
    'https://i.pravatar.cc/30?img=6',
  ];

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.projectId = this.route.snapshot.paramMap.get('id');
    });
  }
}
