// import { User } from '../models/User';
// import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { UserService } from '../_services/User.service';
// import { Pagination, PaginationResult } from '../models/pagination';
// import { catchError } from 'rxjs/operators';
// import { AlertifyServiceService } from '../_services/alertifyService.service';
// import { Injectable } from '@angular/core';
// @Injectable()
// export class ListResolver implements Resolve<PaginationResult<User[]>> {
//     // tslint:disable-next-line:no-unused-expression
//     likesorlikees = 'likers';
//     constructor(private user: UserService, private alert: AlertifyServiceService, private route: Router) {
//     }
//     resolve(route: ActivatedRouteSnapshot): Observable<PaginationResult<User[]>> {
//         console.log(this.likesorlikees);
//         const a = this.user.getUsers(1, 5, null, this.likesorlikees).pipe(catchError(
//             (error) => {
//                 this.alert.error(error);
//                 this.route.navigate(['/home']);
//                 return of(null);
//             }
//             ));
//             console.log(a);
//             return a;
//         }

// }
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ListResolver implements Resolve<User[]> {
    constructor(private route: Router, private users: UserService, private alert: AlertifyServiceService) { }
    pagenum = 1;
    itemperpage = 4;
    likesorlikees = 'likers';
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.users.getUsers(this.pagenum, this.itemperpage, null, this.likesorlikees).pipe(catchError(error => {
            this.alert.error(error);
            this.route.navigate(['/home']);
            return of(null);
        }));
    }

}
