import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginauthService } from '../_services/loginauth.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  mainphoto: string;
  constructor(public auth: LoginauthService, private alertify: AlertifyServiceService, private routes: Router) { }
  model: any = {};
  ngOnInit() {
   // console.log('ngoninit is called at nav.ts');
   this.auth.changePhoto(localStorage.getItem('mainphoto'));
   this.auth.mainphotourl.subscribe((value) => {
    console.log('this is the value from nav: ' + value);
    this.mainphoto = value;
  });

  }

  login() {
    this.auth.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfully');
      // this.mainphoto = localStorage.getItem('mainphoto');
      this.auth.changePhoto(localStorage.getItem('mainphoto'));
      this.auth.mainphotourl.subscribe((value) => {
        console.log('this is the value from nav: ' + value);
        this.mainphoto = value;
      });
      console.log(this.mainphoto);
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.routes.navigate(['/members']);
    });
  }

  loggedIn() {
    console.log('logged in is called');
    // this.mainphoto = localStorage.getItem('mainphoto');
    return this.auth.loggedIn();
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('mainphoto');
    this.alertify.message('logged out');
    this.routes.navigate(['/home']);
  }

}
