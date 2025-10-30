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
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [NgIcon, RouterLink, NgClass, RouterLinkActive],
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
