import { Component, OnInit } from '@angular/core';

import { UserManagementService }  from '../../services/user.management.service';
import { MatDialog } from '@angular/material';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { Player } from '../../models/player.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  players: Player[]
  displayedColumns = ['userName', 'firstName', 'lastName', 'actions'];
  email: string; 

  constructor(private userManagementService: UserManagementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userManagementService.getPlayers()
      .subscribe(players => this.players = players);
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent, {
      width: '250px',
      data: {name: this.email,}
    });    
  }

  delete(player: Player): void {
    this.players = this.players.filter(p => p !== player);
    this.userManagementService.deletePlayer(player).subscribe();
  }
}
