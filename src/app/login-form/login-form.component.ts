import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../shared/models/credentials.interface';
import { UserService } from '../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  errors: string;
  loginForm: FormGroup;
  hide = true;
  requestFailure = false;
  isLoading = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup( {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      })
    });
  }

  login() {
    this.errors='';
    this.requestFailure = false;
    this.isLoading = true;
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        result => {
          if(result) {
            this.router.navigate(['/dashboard/home']);
            this.isLoading = false;
          }
        },
        error => {
          this.isLoading = false;
          this.requestFailure = true;
          this.errors = error;
        }
      );
  }

}

