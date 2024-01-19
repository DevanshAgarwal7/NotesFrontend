import { Component } from '@angular/core';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isEmailValid = false;
  disableSendOTPOButton = false;
  showOtpField = false;
  validMessageStatus = false ;
  notValidMessageStatus = false;
  verificationStatus = false;
  hideVerifyButton = false;
  userEmail = "";
  inputtedOTP="";
  fieldReadOnlyStatus = false;

  bgImage = environment.images.bgImage;
  signupLogo = environment.images.signUpLogo;

  validateEmail(){    
   
  }
  verifyEmail(){
    this.disableSendOTPOButton = true;
    this.showOtpField = true;
    this.inputtedOTP = "";
    this.notValidMessageStatus = false;
    
  }
  isOTPMatched(){    
    if(this.inputtedOTP === "2345"){
      this.hideVerifyButton = true;
      this.validMessageStatus = true;
      this.notValidMessageStatus = false;
      this.fieldReadOnlyStatus = true;
      this.disableSendOTPOButton = true;
    }
    else{
      this.notValidMessageStatus = true;
      this.hideVerifyButton = false;
      this.validMessageStatus = false;
      this.fieldReadOnlyStatus = false;
      this.disableSendOTPOButton = false;
    }
  }

  handleSubmit(){
    console.log("aaa");
    
    this.showPopupMessage();
  }

  private showPopupMessage(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "The Details you give are Correct ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Change",
      reverseButtons: true
    })
  }
}
