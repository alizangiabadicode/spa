import { UserService } from './_services/User.service';
import { AuthGuard } from './_guards/auth.guard';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { map } from 'rxjs/operators';
import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginauthService } from './_services/loginauth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyServiceService } from './_services/alertifyService.service';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { MemberCardComponent } from './members/memberCard/memberCard.component';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'rxjs';
import { UserdetailComponent } from './members/userdetail/userdetail.component';
import { Resolver } from './Resolvers/member.resolver';
import { Resolvers } from './Resolvers/members.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { EditResolver } from './Resolvers/memberEdit.resolver';
import { preventguard } from './_guards/edit_profile/prevent.guard';
import { PhotoEditComponent } from './members/photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ListResolver } from './Resolvers/Lists.resolver';
import { MessagesResolver } from './Resolvers/Messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MemberMessageResolver } from './Resolvers/member.message.resolver';


export function returnToken() {
   return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MemberListComponent,
      MessagesComponent,
      MemberCardComponent,
      UserdetailComponent,
      MemberEditComponent,
      PhotoEditComponent,
      TimeAgoPipe,
      MemberMessagesComponent
   ],
   imports: [
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: returnToken,
            blacklistedRoutes: ['localhost:5000/api/auth'],
            whitelistedDomains: ['localhost:5000']
         }
      }),
      FileUploadModule,
      NgxGalleryModule,
      BrowserAnimationsModule,
   ],
   providers: [
      LoginauthService,
      ErrorInterceptorProvider,
      AlertifyServiceService,
      AuthGuard,
      UserService,
      Resolver,
      Resolvers,
      EditResolver,
      preventguard,
     ListResolver,
     MessagesResolver,
     MemberMessageResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
