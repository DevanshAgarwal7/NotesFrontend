import { Component } from '@angular/core';
import { getLoggedInStatus } from 'src/model/logged-in';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLogged = getLoggedInStatus();
}
