import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/Message';
import { UserService } from '../../_services/User.service';
import { LoginauthService } from '../../_services/loginauth.service';
import { AlertifyServiceService } from '../../_services/alertifyService.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() reciverId;
  messages: Message[] = [];
  messageToSend: any = { };
  constructor(private user: UserService, private auth: LoginauthService,
    private alert: AlertifyServiceService) { }

  ngOnInit() {
    // this.messageToSend.content = '';
    this.loadUsers();
  }

  loadUsers() {
    this.user
    .getMessageThread(this.auth.decodedone.nameid, this.reciverId)
    .subscribe((next) => {
      this.messages = next;
      console.log('this is the messages ' + this.messages);
      console.log( this.messages);
    }, error => {
      this.alert.error(error);
    });
  }

  sendMessage() {
    // this.messageToSend.senderId = this
    this.messageToSend.reciverId = this.reciverId;
    this.user.sendMessage(this.auth.decodedone.nameid, this.messageToSend).subscribe((next: Message) => {
      console.log(next);
      this.messages.unshift(next);
      this.messageToSend.content = '' ;
    });
  }

}
