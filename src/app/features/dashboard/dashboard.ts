import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from "../../components/side-bar/side-bar";
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideBar, SearchBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
