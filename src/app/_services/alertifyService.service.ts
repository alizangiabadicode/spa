import { Injectable } from '@angular/core';
import { ok } from 'assert';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyServiceService {

constructor() {
 }
 confirm(message: String, okCallBack: () => any) {
   alertify.confirm(message, function(e) {
     if (e) {
       okCallBack();
     } else {}
   });
 }

 success(message: String) {
   alertify.success(message);
 }

 error(message: any) {
   alertify.error(message);
 }

 message(message: any) {
   alertify.message(message);
 }

 warning(message: any) {
   alertify.warning(message);
 }
}
