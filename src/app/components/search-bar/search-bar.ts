import { Component, inject, OnInit } from '@angular/core';
import {
  bootstrapBell,
  bootstrapPersonFill,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { AuthServices } from '../../core/services/authService/auth-service';

@Component({
  selector: 'app-search-bar',
  imports: [NgIcon],
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
  public userName: string = '';

  ngOnInit(): void {
    this.userName = this.authService.getUserDetails().fullName;
  }
}
