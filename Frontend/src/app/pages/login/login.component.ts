import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFormControl = new FormGroup({
    userEmail: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.minLength(7)])
  })

  get userEmailvalidator(){
    return this.loginFormControl.get('userEmail');
  }

  get userPasswordValidator(){
    return this.loginFormControl.get('password');
  }

  bgImage = environment.images.bgImage;
  loginLogo = environment.images.loginLogo
  constructor(private router: Router){}

  handleSubmit(){
    console.log(this.loginFormControl.value);
    if( this.loginFormControl.value.userEmail != null 
      && this.loginFormControl.value.userEmail === "deva@gmail.com"){
      this.showSuccessAlert();
    }
    else{
      this.showErrorAlert();
    }
    
  }

  private showSuccessAlert(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully, Redirecting....",
      color: "green"
    }).then(function(){
      // window.location.href = "notes/u"
    })
  }

  private showErrorAlert(){
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Please Provide Correct Email And Password OR You Are Not Registered With Us.",
      color: "red",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }
}
