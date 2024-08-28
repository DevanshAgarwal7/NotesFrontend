import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { BannerMessage } from 'src/model/banner-message';
import { setUserDetails, setUserNotes, setLoggedInStatus, getUserDetails } from 'src/model/logged-in';
@Component({
  selector: 'app-navbar-details',
  templateUrl: './navbar-details.component.html',
  styleUrls: ['./navbar-details.component.css']
})
export class NavbarDetailsComponent{

  characterName: any;
  about_developer = environment.about_developer;
  showToggle = false;
  private bannerMessage: BannerMessage | undefined;

  constructor(private router: Router){   
    this.characterName = this.getProfileLogo();
    this.bannerMessage = new BannerMessage();
  }

  toggle(){
    this.showToggle = !this.showToggle;
  }

  private getProfileLogo(){
    if(getUserDetails()){
      return getUserDetails().firstName.substring(0,1);
    }
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
