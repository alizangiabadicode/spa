import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { LoginauthService } from '../../_services/loginauth.service';
import { UserService } from '../../_services/User.service';
import { User } from 'src/app/models/User';
import { AlertifyServiceService } from '../../_services/alertifyService.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[];
  // @Output() newPhoto = new EventEmitter<String>();
  baseurl = environment.apiurl;
  uploader: FileUploader = new FileUploader({
    url: this.baseurl + 'users/' + this.auth.decodedone.nameid + '/photos',
    isHTML5: true,
    autoUpload: false,
    authToken: 'Bearer ' + localStorage.getItem('token'), // inja niaze k token ro b
    // frestim chon auth0 fqt token ro b httpclient ha atach mik
    // one tu documentaion hm ino gofte
    maxFileSize: 5 * 1024 * 1024,
    removeAfterUpload: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  constructor(private auth: LoginauthService, private user: UserService, private alert: AlertifyServiceService) {
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo: Photo = JSON.parse(response);
      this.photos.push(photo);
      this.auth.changePhoto(photo.url);
    };
    this.uploader.onErrorItem = (fileitem, response, status, parsedresponseheaders) => {
      this.alert.error(response);
    };
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    localStorage.setItem('mainphoto', photo.url);
    this.user.setMainPhoto(this.auth.decodedone.nameid, photo.id).subscribe(() => {
      const current = this.photos.filter(p => p.isMain)[0];
      if (current) {
        current.isMain = false;
      }
      console.log(photo);
      photo.isMain = true;
      // this.newPhoto.emit(photo.url);
      console.log('main photo changed!');
      this.auth.changePhoto(photo.url);
    }, error => {
      this.alert.error('error');
    });
  }

  deletePhoto(photo: Photo) {
    this.alert.confirm('The photo will deleted permananty! are u sure? ', () => {
      this.user.deletePhoto(photo.id, this.auth.decodedone.nameid).subscribe(() => {
        // hala k delete tu api kamel anjam shode tu ui hm pakesh konm
        const ismain = photo.isMain;
        if (ismain === true) {
          localStorage.setItem('mainphoto', '../../assets/defaultuser.png');
          this.auth.changePhoto('../../assets/defaultuser.png');
        }
        this.photos.splice(this.photos.findIndex((p) => p.id === photo.id), 1);
      }
        , error => {
          this.alert.error(error);
        });
    });
  }

}
