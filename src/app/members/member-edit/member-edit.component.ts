import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyServiceService } from '../../_services/alertifyService.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/User.service';
import { LoginauthService } from '../../_services/loginauth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editform') editform: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  method($event: any) {
    if (this.editform.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alert: AlertifyServiceService,
    private us: UserService, private auth: LoginauthService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
      this.auth.mainphotourl.subscribe(value => {
        this.user.photoUrl = value;
      });
    });
  }

  updateEdit() {
    this.us.updateUser(+this.auth.decodedone.nameid, this.user).subscribe(next => {
      this.alert.success('Profile Updated Successfully!');
      console.log(this.user);
      this.editform.reset(this.user);
    }, error => {
      this.alert.error(error);
    });
  }

  // updateProf(url) {
  //   this.user.photoUrl = url;
  //   console.log('prof updated');
  // }

}
