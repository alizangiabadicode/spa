import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { UserdetailComponent } from './members/userdetail/userdetail.component';
import { Resolver } from './Resolvers/member.resolver';
import { Resolvers } from './Resolvers/members.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { EditResolver } from './Resolvers/memberEdit.resolver';
import { preventguard } from './_guards/edit_profile/prevent.guard';
import { ListResolver } from './Resolvers/Lists.resolver';
import { MessagesResolver } from './Resolvers/Messages.resolver';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: { users: Resolvers } },
            { path: 'members/:id', component: UserdetailComponent, resolve: { user: Resolver }, },
          { path: 'messages', component: MessagesComponent, resolve: { messages: MessagesResolver} },
            { path: 'lists', component: ListsComponent, resolve: { userss: ListResolver} },
            {path: 'member/edit' , component : MemberEditComponent , resolve: {
                user : EditResolver
            }, canDeactivate: [preventguard]
        }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

