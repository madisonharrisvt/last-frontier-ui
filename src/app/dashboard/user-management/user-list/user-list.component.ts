import { Component, OnInit } from '@angular/core';

import { UserManagementService }  from '../../services/user.management.service';
import { Identity } from '../../models/identity.interface';
import { MatDialog } from '@angular/material';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  identities: Identity[];
  displayedColumns = ['userName', 'firstName', 'lastName'];
  email: string; 

  constructor(private userManagementService: UserManagementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userManagementService.getCharacters()
      .subscribe(users => this.identities = users);
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '250px',
      data: {name: this.email,}
    });    
  }
}
