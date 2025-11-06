import { Component, OnInit, signal } from '@angular/core';
import { bootstrapBell, bootstrapPersonFill, bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { User } from '../../models/auth-models/user.model';

@Component({
  selector: 'app-search-bar',
  imports: [NgIcon],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  viewProviders: [
    provideIcons({
  bootstrapSearch,bootstrapBell,bootstrapPersonFill
    }),
  ],
})
export class SearchBar implements OnInit {
  protected userDetails = signal<User>({ fullName: '', email: '', role: '', password: ''});
  ngOnInit(): void {
    this.userDetails.set(JSON.parse(localStorage.getItem('userDetails')!));
  }
}
