import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Message } from '../models/Message';
import { Observable, of } from 'rxjs';
import { LoginauthService } from '../_services/loginauth.service';
import { UserService } from '../_services/User.service';
import { MemberMessagesComponent } from '../members/member-messages/member-messages.component';
import { catchError } from 'rxjs/operators';
import { AlertifyServiceService } from '../_services/alertifyService.service';

@Injectable()
export class MemberMessageResolver implements Resolve<Message[]> {
    constructor(private auth: LoginauthService, private user: UserService, private router: Router,
         private component: MemberMessagesComponent, private alert: AlertifyServiceService) {}

    resolve(route): Observable<Message[]> {
        return this.user.getMessageThread(this.auth.decodedone.nameid, this.component.reciverId)
        .pipe(
            catchError(error => {
                this.router.navigate(['/members']);
                this.alert.error(error);
                return of(null);
            })
        );
    }

}
