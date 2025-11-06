import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {} from '@ng-icons/ionicons';
import {
  bootstrapLayoutSidebarInsetReverse,
  bootstrapBarChart,
  bootstrapAmd,
  bootstrapChatLeftDots,
  bootstrapCheck2Circle,
  bootstrapFolder2Open,
  bootstrapGear,
  bootstrapGrid1x2,
  bootstrapLayoutSidebarInset,
  bootstrapPlus,
  bootstrapCalendar2Check,
} from '@ng-icons/bootstrap-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeNode } from '../../models/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Project } from '../../models/project';
import { ProjectService } from '../../core/services/projectService/project-service';
import { Subject, takeUntil } from 'rxjs';
import { toast } from 'ngx-sonner';
import { SlicePipe } from '@angular/common';

interface ProjectsLinks {
  name: string;
  route: string;
}

@Component({
  selector: 'app-side-bar',
  imports: [
    NgIcon,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatTooltipModule,
    SlicePipe
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
  viewProviders: [
    provideIcons({
      bootstrapLayoutSidebarInsetReverse,
      bootstrapLayoutSidebarInset,
      bootstrapAmd,
      bootstrapGear,
      bootstrapBarChart,
      bootstrapGrid1x2,
      bootstrapFolder2Open,
      bootstrapCheck2Circle,
      bootstrapChatLeftDots,
      bootstrapPlus,
      bootstrapCalendar2Check,
    }),
  ],
})
export class SideBar implements OnInit {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroy$ = new Subject<void>();
  protected readonly projectService = inject(ProjectService);
  protected isSidebarOpen = signal<boolean>(true);
  protected isProjectsOpen = signal<boolean>(true);
  protected projectTreeData = signal<TreeNode[]>([]);
  protected allProjects = signal<Project[]>([]);
  protected allProjectsLinks = signal<ProjectsLinks[]>([]);
  protected isLoading = signal(false);
  protected userId = signal<string>('');

  constructor() {
    this.userId.set(JSON.parse(localStorage.getItem('userDetails')!).id);
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSidebarOpen.set(!result.matches);
      });
    this.loadProjects();
  }

  protected toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  protected toggleProjects() {
    if (!this.isSidebarOpen()) {
      this.toggleSidebar();
      if (this.isProjectsOpen()) {
        return;
      }
    }
    this.isProjectsOpen.set(!this.isProjectsOpen());
  }

  protected sidebarLinks = [
    {
      name: 'Dashboard',
      icon: 'bootstrapGrid1x2',
      path: 'home',
    },
    {
      name: 'Projects',
      icon: 'bootstrapFolder2Open',
      path: 'projects',
    },
    {
      name: 'Chat',
      icon: 'bootstrapChatLeftDots',
      path: 'chat',
    },
    {
      name: 'Analytics',
      icon: 'bootstrapBarChart',
      path: 'analytics',
    },
  ];

 protected loadProjects(): void {
     this.isLoading.set(true);
    this.projectService
      .getProjects(this.userId())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allProjects.set(data);
          this.allProjects().map((project) => {
            const pro = { name: project.name, route: `projects/${project.id}` };
            this.allProjectsLinks.update((prev) => [...prev, pro]);
          });
          this.projectTreeData.set(this.allProjectsLinks());
          this.isLoading.set(false);
        },
        error: (err) => {
          toast.error('Failed to load projects', {
            description:
              err?.error?.message ||
              'An error occurred while loading projects.',
          });
          this.isLoading.set(false);
        },
      });
  }
}
