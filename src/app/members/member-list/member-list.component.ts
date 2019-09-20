import { Component, OnInit } from '@angular/core';

import { UserService } from '../../_services/User.service';
import { User } from '../../models/User';
import { AlertifyServiceService } from '../../_services/alertifyService.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../../models/pagination';
import { Resolvers } from 'src/app/Resolvers/members.resolver';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  userss: User[];
  pagination: Pagination;
  resetGender: string;
  genders = [
    { value: 'male', name: 'male' },
    { value: 'female', name: 'female' }
  ];
  constructor(private userService: UserService, private alertify: AlertifyServiceService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.userss.length
    this.route.data.subscribe((data) => {
      this.userss = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.pagination.minAge = 18;
    this.pagination.maxAge = 99;
    this.resetGender = this.pagination.gender = this.userss[0].gender == null ? '' : this.userss[0].gender;
    this.pagination.order = '';
    console.log('entered member list ng on init');
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log('page ' + event.page);
    console.log(this.pagination.currentPage);
    // this.membersReslover.pagenum = event.page;
    this.loadUsers(this.pagination);
  }


  loadUsers(ageAndgender?) {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, ageAndgender).subscribe((users) => {
      this.userss = users.result;
      // this.pagination = users.pagination;
      this.pagination.totalItems = users.pagination.totalItems;
    }, (err) => {
      this.alertify.error(err);
    });
  }

  submitCriteria() {
    console.log(this.pagination.gender);
    console.log(this.pagination.minAge);
    console.log(this.pagination.maxAge);
    this.loadUsers(this.pagination);
    // this.pagination.gender = this.userss[0].gender == null ? '' : this.userss[0].gender;
  }

  resetCriteria() {
    this.pagination.gender = this.resetGender;
    this.pagination.minAge = 18;
    this.pagination.maxAge = 99;
    this.loadUsers(this.pagination);
  }

  changeOrder() {
    this.loadUsers(this.pagination);
  }
}
