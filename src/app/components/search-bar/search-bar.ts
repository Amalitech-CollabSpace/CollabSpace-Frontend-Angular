import { Component, inject, OnInit, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  bootstrapBell,
  bootstrapPersonFill,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { AuthServices } from '../../core/services/authService/auth-service';

@Component({
  selector: 'app-search-bar',
  imports: [NgIcon, TitleCasePipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  viewProviders: [
    provideIcons({
      bootstrapSearch,
      bootstrapBell,
      bootstrapPersonFill,
    }),
  ],
})
export class SearchBar implements OnInit {
  private readonly authService = inject(AuthServices);
  public userName = signal('');
  public role = signal('');

  ngOnInit(): void {
    this.userName.set(this.authService.getUserDetails().fullName);
    this.role.set(this.authService.getUserDetails().role);
  }
}
