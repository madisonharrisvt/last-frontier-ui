import { Component, OnInit } from '@angular/core';
import * as decode from 'jwt-decode';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  email = '';
  ForgotPasswordForm: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.email = payload["sub"];

    this.ForgotPasswordForm = new FormGroup ({
      email: new FormControl( {
        value: this.email, 
        disabled: true
      }, {
        validators: [Validators.required]
      })
    });
  }

  resetPassword() {
    this.userService.requestPasswordReset(this.email).subscribe();
  }

}
