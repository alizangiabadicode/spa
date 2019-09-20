import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../_services/User.service';
import { LoginauthService } from '../_services/loginauth.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EditResolver implements Resolve<User> {
    constructor(private user: UserService, private auth: LoginauthService, private alert: AlertifyServiceService
        , private route: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.user.getUser(+this.auth.decodedone.nameid).pipe(catchError(error => {
            this.alert.error(error);
            this.route.navigate(['members']);
            return of(null);
        }));
    }

}
