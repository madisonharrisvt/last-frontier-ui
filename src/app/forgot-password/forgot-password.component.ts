import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email = '';
  ForgotPasswordForm: FormGroup;
  resetSuccess = false;
  isLoading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.ForgotPasswordForm = new FormGroup ({
      email: new FormControl( '', {
        validators: [Validators.required]
      })
    });
  }

  resetPassword() {
    this.email = this.ForgotPasswordForm.value.email;

    this.isLoading = true;
    this.userService.requestPasswordReset(this.email)
      .subscribe(() => {
        this.resetSuccess = true;
        this.isLoading = false;
      });
  }

}
