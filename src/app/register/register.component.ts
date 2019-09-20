import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { LoginauthService } from '../_services/loginauth.service';
import { AlertifyServiceService } from '../_services/alertifyService.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerDirective, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  bsconfig: Partial<BsDatepickerConfig>;
  @Output() valuesSentFromChildtoParent = new EventEmitter();
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
  registerform: FormGroup;
  constructor(private auth: LoginauthService, private alertify: AlertifyServiceService, private formbuilder: FormBuilder,
    private route: Router) { }
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }
  ngOnInit() {
    this.bsconfig = Object.assign({}, { containerClass: 'theme-default' });
    // this.registerform = new FormGroup(
    //   {
    //     username: new FormControl('', Validators.required),
    //     password: new FormControl('initial value', [
    //       Validators.required, Validators.minLength(4), Validators.maxLength(8)
    //     ]),
    //     confirmpassword: new FormControl('', Validators.required)
    //   }, this.confirmandpasswordmatch
    // );
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerform = this.formbuilder.group(
      {
        gender: ['male', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmpassword: ['', Validators.required],
        knownas: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      },
      {
        validator: this.confirmandpasswordmatch
      }
    );
  }

  confirmandpasswordmatch(g: FormGroup) {
    // console.log(g.errors);
    // vgg.
    // g.get('sdfas').touched
    return g.get('password').value === g.get('confirmpassword').value ? null : { 'mismatch': true };
  }

  register() {
    // this.auth.register(this.model).subscribe(() => {
    //   this.alertify.success('registered!');
    // }, error => {
    //   this.alertify.error(error);
    // });
    // console.log(this.model);
    const model = Object.assign({}, this.registerform.value);
    this.auth.register(model).subscribe(() => {
    this.alertify.success('registered!');
    }, (error) => {
      this.alertify.error(error);
    }, () => {
      // login automatically when registered!
      this.auth.login(model).subscribe(
        () => {
          this.route.navigate(['/members']);
        }
      );
    });
    console.log(this.registerform.value);
  }

  canceled() {
    this.valuesSentFromChildtoParent.emit(false);
  }
}
