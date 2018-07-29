import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';
import { AddPlayerDialogData } from '../../models/add-player.interface';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  newPlayer = new AddPlayerDialogData();
  playerForm: FormGroup;
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private router: Router,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.playerForm = new FormGroup( {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createPlayer(): void {
    this.newPlayer.email = this.playerForm.value.email;

    this.userManagementService.createPlayerByEmail(this.newPlayer)
      .subscribe(userId => {
        this.userId = userId;
        this.router.navigateByUrl(`/dashboard/user-detail/${this.userId}`);
      });
  }

}
