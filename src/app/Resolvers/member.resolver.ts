import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { UserService } from '../_services/User.service';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class Resolver implements Resolve<User> {
    constructor(private route: Router, private alert: AlertifyServiceService,
        private user: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.user.getUser(+route.params['id']).pipe(
            catchError((error) => {
                this.alert.error(error);
                this.route.navigate(['/members']);
                return  of(null);
            })
        );
    }

}
