import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 
  color = 'white';
  navbarCustomProperties = environment.navbarProperties;
  about_developer = environment.about_developer;
  showToggle = false;
  toggle(){
    this.showToggle = !this.showToggle;
  }
}
