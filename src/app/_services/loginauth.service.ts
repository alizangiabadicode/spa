import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginauthService {
  // mainphoto: String;
  jwt = new JwtHelperService();
  decodedone: any;
  constructor(private http: HttpClient) { }
  baseurl =  environment.apiurl + 'auth/';
  behaviour = new BehaviorSubject<string>('../assets/defaultuser.png');
  mainphotourl = this.behaviour.asObservable();
  changePhoto(photo: string) {
    this.behaviour.next(photo);
  }
  login(model: any) {
    return this.http.post(this.baseurl + 'login', model).pipe(map((response: any) => {
      console.log('entered login');
      const user = response;
      console.log( user);
      // this.mainphoto = response.mainphotourl;
      localStorage.setItem('token', user.token);
      if (user.mainphotourl == null) {
        console.log('mainphoto url is null so set it to default!');
        localStorage.setItem('mainphoto', '../../assets/defaultuser.png');
      } else {
        localStorage.setItem('mainphoto', user.mainphotourl);
      }
      // this.changePhoto(user.mainphotourl);
      this.decodedone = this.jwt.decodeToken(user.token);
      console.log(this.decodedone);
    }));
  }

  register(model: any) {
    return this.http.post(this.baseurl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwt.isTokenExpired(token);
  }
}
