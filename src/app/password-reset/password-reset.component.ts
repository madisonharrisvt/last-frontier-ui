import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  password = '';
  ResetPasswordForm: FormGroup;
  resetSuccess = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl( '', {
        validators: [Validators.required]
      })
    });
  }

  resetPassword() {
    this.password = this.ResetPasswordForm.value.password;
    var email = this.route.snapshot.paramMap.get('email');
    var token = this.route.snapshot.paramMap.get('token');

    this.isLoading = true
    this.userService.resetPassword(email, this.password, token)
      .subscribe(() => {
        this.resetSuccess = true;
        this.isLoading = false
      });
  }

}
