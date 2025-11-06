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
import { NgClass, SlicePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeNode } from '../../models/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Project } from '../../models/project.model';
import { Subject, takeUntil } from 'rxjs';
import { ProjectService } from '../../core/services/projectService/project.service';
import { toast } from 'ngx-sonner';
@Component({
  selector: 'app-side-bar',
  imports: [
    NgIcon,
    RouterLink,
    NgClass,
    RouterLinkActive,
    MatIconModule,
    SlicePipe,
    MatTooltipModule,
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
  private breakpointObserver = inject(BreakpointObserver);
  isSidebarOpen = signal<boolean>(true);
  isProjectsOpen = signal<boolean>(true);
  allProjects: Project[] = [];
  allProjectsLinks: any = [];
  filteredProjects: Project[] = [];
  isLoading = false;
  error: string | null = null;
  userId: string;
  projectTreeData: TreeNode[] = [];
  private destroy$ = new Subject<void>();

  constructor(private projectService: ProjectService) {
    this.userId =
      JSON.parse(localStorage.getItem('userDetails')!).id || 'mock-user-id';
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSidebarOpen.set(!result.matches);
      });
    this.loadProjects();

    console.log(this.allProjectsLinks);
  }

  toggleSidebar() {
    this.isSidebarOpen.update((open) => !open);
  }

  toggleProjects() {
    if (!this.isSidebarOpen()) {
      this.toggleSidebar();
      if (this.isProjectsOpen()) {
        return;
      }
    }
    this.isProjectsOpen.set(!this.isProjectsOpen());
  }

  sidebarLinks = [
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

  loadProjects(): void {
    this.projectService
      .getProjects(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.allProjects = data;
          this.allProjects.map((p) => {
            const pro = { name: p.name, route: `projects/${p.id}` };
            console.log(pro);
            this.allProjectsLinks.push(pro);
            console.log(this.allProjectsLinks);
          });
          this.projectTreeData = [...this.allProjectsLinks]
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load projects. Please try again later.';
          toast.error('Failed to load projects', {
            description:
              err?.error?.message ||
              'An error occurred while loading projects.',
          });
          this.isLoading = false;
        },
      });
    }
    
    

}
