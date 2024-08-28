import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { BannerMessage } from 'src/model/banner-message';
import { setLoggedInStatus, setUserDetails, setUserNotes } from 'src/model/logged-in';

@Component({
  selector: 'app-navbar-toggle',
  templateUrl: './navbar-toggle.component.html',
  styleUrls: ['./navbar-toggle.component.css']
})
export class NavbarToggleComponent {
  
  about_Developer = environment.about_developer;
  private bannerMessage: BannerMessage | undefined;

  constructor(private router: Router){
    this.bannerMessage = new BannerMessage();
  }

  logout(){
    setUserDetails(undefined);
    setUserNotes(undefined);
    setTimeout(() => {
      setLoggedInStatus(false);
      this.router.navigateByUrl("");
      this.bannerMessage?.getSuccessMessage(environment.success.logout);
    }, 1500);
  }
}
