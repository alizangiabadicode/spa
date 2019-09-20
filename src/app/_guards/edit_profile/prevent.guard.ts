import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from 'src/app/members/member-edit/member-edit.component';
@Injectable()
// tslint:disable-next-line:class-name
export class preventguard implements CanDeactivate<MemberEditComponent> {
    constructor() { }
    canDeactivate(component: MemberEditComponent) {
        if (component.editform.dirty) {
            return confirm('currently changes aren\'t saved are you sure to leave?');
        }
        return true;
    }
}
