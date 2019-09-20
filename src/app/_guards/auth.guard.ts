import { AlertifyServiceService } from './../_services/alertifyService.service';
import { LoginauthService } from './../_services/loginauth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginauthService, private route: Router
    , private alertify: AlertifyServiceService) {}
  canActivate():  boolean {
    if (!this.auth.loggedIn()) {
      this.alertify.error('You Can\'n access this page because You are not authenticated!');
      this.route.navigate(['home']);
      return false;
    }
    return true;
  }
}
