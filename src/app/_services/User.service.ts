import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { PaginationResult, Pagination } from '../models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../models/Message';

// const token_header = {
//   headers: new HttpHeaders(
//     { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
//   )
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiurl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(pagenum?, itemperpage?, _pagination?, likersOrlikees?): Observable<PaginationResult<User[]>> {
    // pageSize=2&pageNumber=3
    let p = new HttpParams();
    const pagination = new PaginationResult<User[]>();
    if (pagenum != null && itemperpage != null) {
      p = p.set('pageSize', itemperpage).set('pageNumber', pagenum);
    }
    if (_pagination != null) {
      p = p.set('minAge', _pagination.minAge).set('maxAge', _pagination.maxAge)
        .set('gender', _pagination.gender).set('order', _pagination.order);
      console.log(p);
    }
    if (likersOrlikees === 'likers') {
      p = p.set('showlikers', 'true');
    }
    if (likersOrlikees === 'likees') {
      p = p.set('showlikees', 'true');
    }

    return this.http.get<User[]>(this.url, { observe: 'response', params: p })
      .pipe(
        map(response => {
          pagination.result = response.body;
          if (response.headers.get('Pagination') != null) {
            pagination.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return pagination;
        })
      );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  getMessagesForSpecificUser(userid, page?, itemsperpage?, messageContainer?) {
    const result: PaginationResult<Message[]> = new PaginationResult<Message[]>();
    let params = new HttpParams();
    if (page != null && itemsperpage != null) {
      params = params.set('pageNumber', page).set('itemsPerPage', itemsperpage);
    }
    params = params.set('messageContainer', messageContainer);

    return this.http.get<Message[]>(this.url + '/' + userid + '/messages', {
      observe: 'response',
      params: params
    }).pipe(map(
      response => {
        result.result = response.body;
        if (response.headers.get('pagination')) {
          result.pagination = JSON.parse(response.headers.get('pagination'));
        }
        return result;
      }));


  }

  getMessageThread(userId: number, reciverId: number) {
    return this.http.get<Message[]>(this.url + '/' + userId + '/messages/' + 'thread/' + reciverId);
  }

  deleteMessage(msgid: number, userid: number) {
    return this.http.post(this.url + '/' + userid + '/messages/' + msgid , { });
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.url + '/' + id, user);
  }

  setMainPhoto(userid: number, id: number) {
    return this.http.post(this.url + '/' + userid + '/photos/' + id + '/setMain', {});
  }

  sendMessage(id, message) {
    return this.http.post(this.url + '/' + id + '/messages', message);
  }

  deletePhoto(id: number, userid: number) {
    return this.http.delete(this.url + '/' + userid + '/photos/' + id);
  }

  like(likerid: number, likeeid: number) {
    return this.http.post(this.url + '/' + likerid + '/like/' + likeeid, {});
  }

}
