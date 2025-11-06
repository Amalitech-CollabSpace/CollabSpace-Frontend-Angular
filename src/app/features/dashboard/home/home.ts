import { Component, OnInit, signal } from '@angular/core';
import { bootstrapCalendar } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProjectCard } from '../../../components/project-card/project-card';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/auth-models/user.model';

@Component({
  selector: 'app-home',
  imports: [MatTabsModule, ProjectCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  viewProviders: [provideIcons({ bootstrapCalendar })],
})
export class Home implements OnInit {
  protected userDetails = signal<User>({ fullName: '', email: '', password: '' });
  ngOnInit(): void {
    this.userDetails.set(JSON.parse(localStorage.getItem('userDetails')!));
  }
}
