import { Component, OnInit } from '@angular/core';

import { UserManagementService }  from '../../services/user.management.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns = ['userName', 'firstName', 'lastName'];
  testString = "help";

  constructor(private userManagementService: UserManagementService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userManagementService.getCharacters()
      .subscribe(users => this.users = users);
  }

  test() {
    this.userManagementService.getResponse()
      .subscribe(testString => this.testString = testString);
  }

}
