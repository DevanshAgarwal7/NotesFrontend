import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private generateOtp(){
    return Math.floor(1000000 + Math.random() * 900000);
  }
  async sendOtp(){
    emailjs.init('bOv_HfUrucENhrMJs');
    let response = await emailjs.send("service_0huws8o","template_uophztc",{
      user_otp: this.generateOtp(),
      company_email: "noreply.yourownnotes@gmail.com",
      });
      console.log(response);
      
  }
}
