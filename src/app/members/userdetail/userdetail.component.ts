import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../_services/User.service';
import { AlertifyServiceService } from '../../_services/alertifyService.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  userr: User;
  @ViewChild('userdetail') userDetail: TabsetComponent;
  constructor(private userService: UserService, private alertify: AlertifyServiceService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.userr = data['user'];
    });
    this.route.queryParams.subscribe(params => {
      this.changeTab(params['tab'] > 0 ? params['tab'] : 0);
    });
    this.galleryOptions = [{
      // fullWidth: true,
      // width: 'auto',
      // height: 'auto',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageurl = [];
    this.userr.photos.forEach((value) => {
      imageurl.push({
        small: value.url,
        medium: value.url,
        big: value.url
      });
    });
    console.log(imageurl);
    return imageurl;
  }

  changeTab(index) {
   const tab =  this.userDetail.tabs[index];
   if (tab) {
     tab.active = true;
   }
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id'])
  //     .subscribe((user: any) => {
  //       this.userr = user;
  //       console.log(user);
  //       // this.userr.username = user.userName;
  //       console.log(user);
  //     }, (error) => {
  //       this.alertify.error(error);
  //     });
  // }
}
