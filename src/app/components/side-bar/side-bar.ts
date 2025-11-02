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
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeNode } from '../../models/tree';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-side-bar',
  imports: [
    NgIcon,
    RouterLink,
    NgClass,
    RouterLinkActive,
    MatIconModule,
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

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSidebarOpen.set(!result.matches);
      });
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

  createProject() {
    this.toggleProjects();
    prompt('Create Project');
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

  projectTreeData: TreeNode[] = [
    { name: 'Website Redesign', route: 'projects/web' },
    { name: 'Mobile App', route: 'projects/mobile' },
  ];
}
