import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource} from '@angular/material';
import { Player } from '../../models/player.interface';
import { UserManagementService } from '../../services/user.management.service';
import { Identity } from '../../models/identity.interface';

@Component({
  selector: 'app-add-player-to-register',
  templateUrl: './add-player-to-register.component.html',
  styleUrls: ['./add-player-to-register.component.css']
})
export class AddPlayerToRegisterComponent implements OnInit {

  filterDataSource = null;
  players: Player[] = null;
  displayColumns = ['firstName', 'lastName', 'actions'];

  constructor(
    private userService: UserManagementService,
    public dialogRef: MatDialogRef<AddPlayerToRegisterComponent>
  ) { }

  ngOnInit() {
    this.userService.getPlayers()
      .subscribe(players => {
        this.players = players;
        var identities = new Array<Identity>();
        players.forEach(player => {
          identities.push(player.identity);
        })
        this.filterDataSource = new MatTableDataSource(identities);
      });
  }

  applyFilter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  selectPlayer(identity: Identity) {
    var player = this.players.filter(p => p.identity === identity);
    this.dialogRef.close(player);
  }
}
