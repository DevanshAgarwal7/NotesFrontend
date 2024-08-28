import { Component } from '@angular/core';
import { getLoggedInStatus } from 'src/model/logged-in';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  profileLogoCharacter: any;

  constructor(){   
    
  }
  isUserLoggedIn(){     
    return getLoggedInStatus();
  } 
}
