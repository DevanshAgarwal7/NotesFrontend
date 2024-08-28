import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private uri = environment.api[0].uri;
  constructor(private http: HttpClient) { }

  getUser(userinfo: object){
    return this.http.post(this.uri + "user", userinfo);
  }

  saveUser(userInfo: object){
    return this.http.post(this.uri + "user/register", userInfo);
  }

  validateEmailWithOTP(userEmail: object) {
    return this.http.post(this.uri + "verify", userEmail);
  }

  signup(userInfo: object) {
    return this.http.post(this.uri + "user/register", userInfo);
  }

  forgotpasswordOTPVerification(userEmail: object) {
    return this.http.post(this.uri + "verify/forgot", userEmail);
  }

  forgotpassword(userNewCredentials: object) {
    return this.http.put(this.uri + "user/forgot/password", userNewCredentials);
  }

}
