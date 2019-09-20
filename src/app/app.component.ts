import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { LoginauthService } from './_services/loginauth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  jwt = new JwtHelperService();
  constructor(private auth: LoginauthService) {}
  ngOnInit() {
      this.auth.decodedone = this.jwt.decodeToken(localStorage.getItem('token'));
    // this.auth.mainphoto = localStorage.getItem('mainphoto');
    // console.log('this is the main photo' + '\n' + this.auth.mainphoto);
  }
}
