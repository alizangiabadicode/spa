import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { UserService } from '../_services/User.service';
import { LoginauthService } from '../_services/loginauth.service';
import { PaginationResult, Pagination } from '../models/pagination';
import { Message } from '../models/Message';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  // @ViewChild('userdetail') userdetailtabset: Ta
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  constructor(private route: ActivatedRoute, private user: UserService,
    private auth: LoginauthService, private alert: AlertifyServiceService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.user.getMessagesForSpecificUser(this.auth.decodedone.nameid,
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.messageContainer).subscribe((res: PaginationResult<Message[]>) => {
        this.pagination = res.pagination;
        this.messages = res.result;
        // console.log(res.result);

      },
      error => {
        this.alert.error(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log('page ' + event.page);
    console.log(this.pagination.currentPage);
    // this.membersReslover.pagenum = event.page;
    this.loadMessages();
  }

  deleteMessage(msgid: number) {
    this.alert.confirm('are u sure to delete msg?', () =>
    this.user.deleteMessage(msgid, +this.auth.decodedone.nameid).subscribe(
      next => {
        this.messages.splice(this.messages.findIndex(e => e.id === msgid), 1);
        this.alert.success('message deleted successfully');
      }, error => {
        this.alert.error(error);
      }
    ));
  }

}
