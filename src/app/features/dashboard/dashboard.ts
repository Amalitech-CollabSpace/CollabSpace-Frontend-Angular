import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from "../../components/side-bar/side-bar";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
