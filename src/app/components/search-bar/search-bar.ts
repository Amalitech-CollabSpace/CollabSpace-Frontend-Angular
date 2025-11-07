import { Component, inject, OnInit, signal } from '@angular/core';
import {
  bootstrapBell,
  bootstrapPersonFill,
  bootstrapSearch,
  bootstrapBoxArrowLeft,
} from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { User } from '../../models/auth-models/user.model';
import { AuthServices } from '../../core/services/authService/auth-service';
import { TitleCasePipe } from '@angular/common';

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
      bootstrapBoxArrowLeft,
    }),
  ],
})
export class SearchBar implements OnInit {
  protected userDetails = signal<User>({
    fullName: '',
    email: '',
    role: '',
    password: '',
  });
  private readonly authService = inject(AuthServices);
  public logUserOut(): void {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.userDetails.set(this.authService.getUserDetails());
  }
}
