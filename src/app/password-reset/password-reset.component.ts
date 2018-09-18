import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordResetValidator } from '../shared/utils/password.reset.validator';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  password = '';
  resetPasswordForm: FormGroup;
  resetSuccess = false;
  isLoading = false;
  hide = true;
  error = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl( '', {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl( '', {
        validators: [Validators.required]
      })
    }, {
        validators: PasswordResetValidator.validate 
      });
  }

  resetPassword() {
    this.password = this.resetPasswordForm.value.password;
    var email = this.route.snapshot.paramMap.get('email');
    var token = this.route.snapshot.paramMap.get('token');

    this.isLoading = true
    this.userService.resetPassword(email, this.password, token)
      .subscribe(() => {
        this.resetSuccess = true;
        this.isLoading = false
      }, error => this.error = error);
  }

}
