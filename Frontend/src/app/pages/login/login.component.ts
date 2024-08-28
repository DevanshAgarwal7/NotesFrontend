import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { BannerMessage } from 'src/model/banner-message';
import { ILoginCredentials } from 'src/model/ilogin-credentials';
import { setUserDetails, setUserNotes, setLoggedInStatus } from 'src/model/logged-in';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFormControl = new FormGroup({
    userEmail: new FormControl(null,[Validators.required, Validators.nullValidator, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(7)])
  })

  get userPasswordValidator(){
    return this.loginFormControl.get('password');
  }

  bgImage = environment.images.bgImage;
  loginLogo = environment.images.loginLogo;
  isEmailValid: boolean = true;
  private unauthorised = environment.errors.unauthorised;
  private bannerMessage: BannerMessage | undefined;

  constructor(private router: Router, private userService: UserService){
    this.bannerMessage = new BannerMessage();
  }

  validateEmail(){
    const regX = /^([a-zA-Z0-9\.-]{1,})@([a-zA-Z0-9-]{1,})\.([a-z]{3,10})(\.[a-z]{2,10})?$/;
    const userEmail = this.loginFormControl.value.userEmail; 
    if(userEmail && !regX.test(userEmail)){
      this.isEmailValid = true;
    }
    else{
      this.isEmailValid = false;
    }
  }

  handleSubmit(){
    if(!this.isEmailValid){
      const userInfo: ILoginCredentials = {
        userEmail: this.loginFormControl.value.userEmail,
        password: this.loginFormControl.value.password
      }
      this.userService.getUser(userInfo).subscribe((response)=>{
        if(response){
          setUserDetails(response);
          setLoggedInStatus(true);
          setTimeout(() => {
            this.router.navigateByUrl("/notes/u");
            this.bannerMessage?.getSuccessMessage(environment.success.loginSuccess);
          }, 1000);   
        }
        else{
          setUserDetails(undefined);
          setUserNotes(undefined);
          setLoggedInStatus(false);
          this.bannerMessage?.showError(this.unauthorised);
        }
      })
    }
    
  }

  
}
