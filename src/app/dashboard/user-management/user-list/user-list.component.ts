import { Component, OnInit } from '@angular/core';

import { UserManagementService }  from '../../services/user.management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Object;
  displayedColumns = ['userName', 'firstName', 'lastName'];

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userManagementService.getCharacters()
      .subscribe(users => this.users = users);
  }

}
