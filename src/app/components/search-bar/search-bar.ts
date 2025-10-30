import { Component } from '@angular/core';
import { bootstrapBell, bootstrapPersonFill, bootstrapSearch } from '@ng-icons/bootstrap-icons';
import { provideIcons, NgIcon } from '@ng-icons/core';

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
export class SearchBar {

}
