import { Component, OnInit } from '@angular/core';
import { Identity } from '../../models/identity.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';
import { Player } from '../../models/player.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  player: Player;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
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
      
      this.userManagementService.getPlayer(id)
        .subscribe(player => {
          this.player = player;
          this.userForm.get('firstName').setValue(player.identity.firstName);
          this.userForm.get('lastName').setValue(player.identity.lastName);
          this.userForm.get('email').setValue(player.identity.email);
          this.userForm.get('emailConfirmed').setValue(player.identity.emailConfirmed);
      });
    }
  }

}
