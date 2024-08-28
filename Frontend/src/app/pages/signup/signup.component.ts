import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { hide } from '@popperjs/core';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environment/environment';
import { BannerMessage } from 'src/model/banner-message';
import { IUserInfo } from 'src/model/iuser-info';
import { setLoggedInStatus, setUserDetails, setUserNotes } from 'src/model/logged-in';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  bannerMessage: BannerMessage | undefined;
  isEmailValid = false;
  disableSendOTPOButton = true;
  showOtpField = false;
  validMessageStatus = false ;
  notValidMessageStatus = false;
  verificationStatus = false;
  hideVerifyButton = true;
  fieldReadOnlyStatus = false;
  OTPfieldReadOnlyStatus = false;
  errorOTPMessage = true;
  private actualOtp: any;
  signupLogo = environment.images.signUpLogo;

  constructor(private userService: UserService, private router: Router){
    this.bannerMessage = new BannerMessage();
  }

  signupForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(7)]),
    enteredOTP: new FormControl('', [Validators.minLength(4), Validators.maxLength(4)])
  })

  validateEmail(){    
    const regX = /^([a-zA-Z0-9\.-]{1,})@([a-zA-Z0-9-]{1,})\.([a-z]{3,10})(\.[a-z]{2,10})?$/;
    const userEmail = this.signupForm.value.userEmail; 
    if(userEmail && !regX.test(userEmail)){
      this.disableSendOTPOButton = true;
      this.isEmailValid = false;
    }
    else{
      this.disableSendOTPOButton = false;
      this.isEmailValid = true;
    }
  }
  verifyEmail(){
    this.bannerMessage?.getSuccessMessage(environment.success.OtpSuccess);
    const email = {
      userEmail: this.signupForm.value.userEmail
    }
    this.userService.validateEmailWithOTP(email).subscribe((response: any) =>{
      this.actualOtp = response.message;      
      if(this.actualOtp === null){
        this.bannerMessage?.showError(environment.errors.alreadyRegistered);
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 3000);
      }
      else{
        this.disableSendOTPOButton = true;
        this.showOtpField = true;
        this.notValidMessageStatus = false;
      }
    })
    
  }
  validateOTP(){
    const enteredOtp = this.signupForm.value.enteredOTP;
    if(enteredOtp && enteredOtp.length == 4){
      this.hideVerifyButton = false;
      this.errorOTPMessage = false;
    }
    else{
      this.hideVerifyButton = true;
      this.errorOTPMessage = true;
    }
  }
  isOTPMatched(){    
    const enteredOtp = this.signupForm.value.enteredOTP;
    this.errorOTPMessage = false;
    if(enteredOtp && enteredOtp == this.actualOtp){
      this.validMessageStatus = true;
      this.hideVerifyButton = true;
      this.notValidMessageStatus = false;
      this.fieldReadOnlyStatus = true;
      this.OTPfieldReadOnlyStatus = true;
      this.disableSendOTPOButton = true;
    }
    else{
      this.notValidMessageStatus = true;
      this.hideVerifyButton = false;
      this.validMessageStatus = false;
      this.fieldReadOnlyStatus = true;
      this.OTPfieldReadOnlyStatus = false;
      this.disableSendOTPOButton = true;
    }
  }

  handleSubmit(){
    const userInfo = {
      userEmail: this.signupForm.value.userEmail,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      password: this.signupForm.value.password
    }
    this.userService.signup(userInfo).subscribe((response: any)=>{
      if(response != null){
        setUserDetails(response);
        setLoggedInStatus(true);
        this.router.navigateByUrl("/notes/u");  
        this.bannerMessage?.getSuccessMessage(environment.success.signupSuccess) 
      }
      else{
        setUserDetails(undefined);
        setUserNotes(undefined);
        setLoggedInStatus(false);
        this.router.navigateByUrl("");
        this.bannerMessage?.showError(environment.errors.alreadyRegistered);
      }
    })
    
  }
}
