import { Component, OnInit } from '@angular/core';

import { UserManagementService }  from '../../services/user.management.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { Player } from '../../models/player.interface';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isLoading = false;
  players: Player[]
  displayedColumns = ['userName', 'firstName', 'lastName', 'actions'];
  email: string; 
  filterDataSource = null;

  constructor(private userManagementService: UserManagementService, public dialog: MatDialog, private characterService: CharacterService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userManagementService.getPlayers()
      .subscribe(players => {
        this.players = players;
        this.filterDataSource = new MatTableDataSource(players);

        this.filterDataSource.filterPredicate = (player: Player, filter: string) => {
          const transformedFilter = filter.trim().toLowerCase();
        
          const listAsFlatString = (obj): string => {
            let returnVal = '';
        
            Object.values(obj).forEach((val) => {
              if (typeof val !== 'object') {
                returnVal = returnVal + ' ' + val;
              } else if (val !== null) {
                returnVal = returnVal + ' ' + listAsFlatString(val);
              }
            });
        
            return returnVal.trim().toLowerCase();
          };
        
          return listAsFlatString(player).includes(transformedFilter);
        };
      });
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

  getAllCharacterSheets() {
    this.isLoading = true;
    this.characterService.getAllCharacterSheets()
      .subscribe(x => {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([x], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = "AllCharacters.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100);

        this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLowerCase();
  }
}
