import { Component } from '@angular/core';
import { bootstrapCalendar } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ProjectCard } from "../../../components/project-card/project-card";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [NgIcon, MatTabsModule, ProjectCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  viewProviders: [provideIcons({ bootstrapCalendar })],
})
export class Home {}
