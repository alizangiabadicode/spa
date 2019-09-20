import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class Resolvers implements Resolve<User[]> {
    constructor(private route: Router, private users: UserService, private alert: AlertifyServiceService) { }
    pagenum = 1;
    itemperpage = 4;
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.users.getUsers(this.pagenum, this.itemperpage).pipe(catchError(error => {
            this.alert.error(error);
            this.route.navigate(['/home']);
            return of(null);
        }));
    }

}
