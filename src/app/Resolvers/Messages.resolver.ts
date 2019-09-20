import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginauthService } from '../_services/loginauth.service';



@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  messageContainer = 'Unread';
  constructor(private route: Router, private users: UserService, private alert: AlertifyServiceService,
    private auth: LoginauthService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.users.getMessagesForSpecificUser(this.auth.decodedone.nameid, null, null, this.messageContainer)
      .pipe(catchError(error => {
        this.alert.error(error);
        this.route.navigate(['/home']);
        return of(null);
      }));
  }

}
