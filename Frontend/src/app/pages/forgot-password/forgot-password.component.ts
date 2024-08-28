import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { BannerMessage } from 'src/model/banner-message';
import { UserService } from 'src/app/service/user.service';
import { ILoginCredentials } from 'src/model/ilogin-credentials';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {

  private bannerMessage: BannerMessage | undefined;
  showOTPField = false;
  disableOTPButton = true;
  makeEmailFieldReadOnly = false;
  disableVerifyButton = true;
  makeOtpFieldReadOnly = false;
  showNewPasswordField = false;
  validMessageStatus = false;
  isEmailValid = true;
  errorOTPMessage = true;
  passwordStatusMessage = false;
  private actualOtp: any;

  bgImage = environment.images.bgImage;
  forgotLogo = environment.images.forgotLogo;

  changePasswordForm = new FormGroup({
    userEmail: new FormControl(null,[Validators.required, Validators.email]),
    enteredOTP: new FormControl(null,[Validators.required,Validators.minLength(4), Validators.maxLength(4)]),
    userNewPassword: new FormControl('',[Validators.required, Validators.minLength(7)])
  })

  get enteredOTPValidator(){
    return this.changePasswordForm.get('enteredOTP');
  }

  get userNewPasswordValidator(){
    return this.changePasswordForm.get('userNewPassword');
  }

  constructor(private router: Router, private userService: UserService){
    this.bannerMessage = new BannerMessage();
  }

  redirtToSignUp(){
    this.router.navigateByUrl("signup");
  }

  validateEmail(){
    const regX = /^([a-zA-Z0-9\.-]{1,})@([a-zA-Z0-9-]{1,})\.([a-z]{3,10})(\.[a-z]{2,10})?$/;
    const userEmail = this.changePasswordForm.value.userEmail;
    if(userEmail && !regX.test(userEmail)){      
      this.disableOTPButton = true;
      this.isEmailValid = true;
    }
    else{
      this.disableOTPButton = false;
      this.isEmailValid = false;
    }
  }

  sendOTP(){
    const email = {
      userEmail: this.changePasswordForm.value.userEmail
    }
    this.userService.forgotpasswordOTPVerification(email).subscribe((response: any) =>{
      this.actualOtp = response.message;      
      if(this.actualOtp === null){
        this.bannerMessage?.showError(environment.errors.unauthorised);
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 3000);
      }
      else{
        this.bannerMessage?.getSuccessMessage(environment.success.OtpSuccess);
        this.disableOTPButton = true;
        this.showOTPField = true;
        this.makeEmailFieldReadOnly = true;
        this.disableOTPButton = true;
      }
    })
  }

  verifyOTP(){
      const enteredOtp: any = this.changePasswordForm.value.enteredOTP;
      if(enteredOtp && enteredOtp.length == 4){
        this.disableVerifyButton = false;
        this.errorOTPMessage = false;
      }
      else{
        this.disableVerifyButton = true;
        this.errorOTPMessage = true;
      }
    }

    verifyUser(){
      const enteredOtp = this.changePasswordForm.value.enteredOTP;
      this.errorOTPMessage = false;
      if(enteredOtp && enteredOtp == this.actualOtp){
        this.disableVerifyButton = true;
        this.makeOtpFieldReadOnly = true;
        this.showNewPasswordField = true;
        this.validMessageStatus = true;
      }
      else{
        this.disableVerifyButton = false;
        this.makeOtpFieldReadOnly = false;
        this.showNewPasswordField = false;
        this.validMessageStatus = false;
      }
    }
  
  passwordStatus(){
    const password: any = this.changePasswordForm.value.userNewPassword
    if(password && password.length >= 7){
      this.passwordStatusMessage = true
    }
    else{
      this.passwordStatusMessage = false;
    }
    
  }

  submitPassword(){
    const userNewCredentials = {
      userEmail: this.changePasswordForm.value.userEmail,
      password:  this.changePasswordForm.value.userNewPassword
    }
    this.userService.forgotpassword(userNewCredentials).subscribe((response: any)=>{
      if(response && response.message != null){
        this.bannerMessage?.getSuccessMessage(environment.success.forgotPassword);
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 3000);
      }
    })
  }
  
}
