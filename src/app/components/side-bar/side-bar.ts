import { Component, inject } from '@angular/core';
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
} from '@ng-icons/bootstrap-icons';
import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Tree } from '../tree/tree';
import { TreeNode } from '../../models/tree';

@Component({
  selector: 'app-side-bar',
  imports: [NgIcon, RouterLink, NgClass, RouterLinkActive, Tree, MatIconModule],
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
    }),
  ],
})
export class SideBar {
  isSidebarOpen: boolean = true;
  isProjectsOpen: boolean = false;

  toggleProjects() {
    this.isProjectsOpen = !this.isProjectsOpen;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
    {
      name: 'Projects',
      children: [
        { name: 'Website Redesign', route: '/projects/website' },
        { name: 'Mobile App', route: '/projects/app' },
      ],
    },
  ];
}
