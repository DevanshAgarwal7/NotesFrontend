import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {

  changePasswordForm = new FormGroup({
    userEmail: new FormControl(null,[Validators.required, Validators.email]),
    enteredOTP: new FormControl(null,[Validators.required,Validators.minLength(5), Validators.maxLength(5)]),
    userNewPassword: new FormControl(null,[Validators.required, Validators.minLength(7)])
  })

  get userEmailvalidator(){
    return this.changePasswordForm.get('userEmail');
  }

  get enteredOTPValidator(){
    return this.changePasswordForm.get('enteredOTP');
  }

  get userNewPasswordValidator(){
    return this.changePasswordForm.get('userNewPassword');
  }

  showOTPField = false;
  disableOTPButton = false;
  makeEmailFieldReadOnly = false;
  disableVerifyButton = false;
  makeOtpFieldReadOnly = false;
  showNewPasswordField = false;
  newPassword = "";
  statusMessage = false;
  isValid = false;

  bgImage = environment.images.bgImage;
  forgotLogo = environment.images.forgotLogo;

  constructor(private route: Router){}

  redirtToSignUp(){
    this.route.navigateByUrl("signup");
  }

  sendOTP(){
    
    if(this.changePasswordForm.value.userEmail != null && this.changePasswordForm.value.userEmail === "deva@gmail.com"){
      this.showOTPField = true;
      this.showOTPSendMessage();
      // this.isValid = true;
    }
    else{
      this.showOTPField = false;
      this.disableOTPButton = false;
      this.showError();
    }
  }
  verifyOTP(){
    
    if(this.changePasswordForm.value.enteredOTP != null && this.changePasswordForm.value.enteredOTP === "23456"){
      this.showNewPasswordField = true;
      this.disableOTPButton = true;
      this.makeEmailFieldReadOnly = true;
      this.makeOtpFieldReadOnly = true;
      this.disableVerifyButton = true;
      
    }
    else{
      this.showNewPasswordField = false;
      this.disableOTPButton = false;
      this.makeEmailFieldReadOnly = false;
      this.disableVerifyButton = false;
    }
  }
  passwordStatus(){
    console.log(this.newPassword);
    if(this.newPassword==="abc@123"){
      this.isValid = true;
      this.statusMessage = true
    }
    else{
      this.isValid = false;
      this.statusMessage = false;
    }
    
  }

  private showOTPSendMessage(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "OTP Send Successfully.",
      color: "green"
    })
  }

  private showError(){
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Please Provide Correct Email OR You Are Not Registered With Us.",
      color: "red",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}
