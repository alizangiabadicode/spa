import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import { Pagination } from '../models/pagination';
import { UserService } from '../_services/User.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute, private user: UserService, private alert: AlertifyServiceService) { }
  likerorlikee = 'likers';
  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log('usersss = ' + data['userss']);
      console.log(data['userss']);
      this.users = data['userss'].result;
      console.log(this.users);
      this.pagination = data['userss'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log('page ' + event.page);
    console.log(this.pagination.currentPage);
    // this.membersReslover.pagenum = event.page;
    this.loadUsers(this.likerorlikee);
  }

  loadUsers(likerorlikee?) {
    console.log(likerorlikee);
    this.user.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, likerorlikee).subscribe((users) => {
      this.users = users.result;
      // this.pagination = users.pagination;
      this.pagination.totalItems = users.pagination.totalItems;
    }, (err) => {
      this.alert.error(err);
    });
  }


}
