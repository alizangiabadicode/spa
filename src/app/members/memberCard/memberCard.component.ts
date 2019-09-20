import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/_services/User.service';
import { LoginauthService } from 'src/app/_services/loginauth.service';
import { AlertifyServiceService } from 'src/app/_services/alertifyService.service';

@Component({
  selector: 'app-membercard',
  templateUrl: './memberCard.component.html',
  styleUrls: ['./memberCard.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(private userr: UserService, private auth: LoginauthService
    , private alert: AlertifyServiceService) { }

  ngOnInit() {
  }

  like(likeeid: number) {
    console.log('entered like' + this.auth.decodedone.nameid);
    this.userr.like(this.auth.decodedone.nameid, likeeid).subscribe(() => {
      this.alert.success(this.user.username + ' liked');
    }, error => {
      this.alert.error(error);
    });
  }

}
