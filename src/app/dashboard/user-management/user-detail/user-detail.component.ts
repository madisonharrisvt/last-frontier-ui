import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    //private location: Location
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup ({
      firstName: new FormControl('', {
        validators: [Validators.required]
      }),
      lastName: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      emailConfirmed: new FormControl()
    });

    this.getAndSetUser();
  }

  getAndSetUser(): void {
    if(this.route.snapshot.paramMap.get('id') !== 'new' &&
        this.route.snapshot.paramMap.get('id') !== null) {

      const id = this.route.snapshot.paramMap.get('id');
      
      this.userManagementService.getUser(id)
        .subscribe(user => {
          this.user = user;
          this.userForm.get('firstName').setValue(user.firstName);
          this.userForm.get('lastName').setValue(user.lastName);
          this.userForm.get('email').setValue(user.email);
          this.userForm.get('emailConfirmed').setValue(user.emailConfirmed);
      });
    }
  }

}
