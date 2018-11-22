import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { NpcShiftService } from '../../services/npc-shift.service';
import { Player } from '../../models/player.interface';
import { NpcShift } from '../../models/npc-shift.interface';
import { Identity } from '../../models/identity.interface';
import { PlayerNpcShift } from '../../models/player-npc-shift.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player-to-npc-shift',
  templateUrl: './add-player-to-npc-shift.component.html',
  styleUrls: ['./add-player-to-npc-shift.component.css']
})
export class AddPlayerToNpcShiftComponent implements OnInit {

  filterDataSource = null;
  players : Player[] = null;
  displayColumns = ['firstName', 'lastName', 'actions'];
  requestFailure = false;
  errors = null;

  constructor(
    private router: Router,
    private npcShiftService: NpcShiftService,
    public dialogRef: MatDialogRef<AddPlayerToNpcShiftComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NpcShift
  ) { }

  ngOnInit() {
    this.getAllPlayersWithoutNpcShift();
  }

  getAllPlayersWithoutNpcShift() {
    this.npcShiftService.getPlayersWithoutNpcShiftForActiveEvent()
      .subscribe(
        players => {
          this.players = players;
          var identities = new Array<Identity>();
          players.forEach(players => {
            identities.push(players.identity);
          });
          this.filterDataSource = new MatTableDataSource(identities);
        },
        error => {
          this.requestFailure = true;
          this.errors = error;
        });
  }

  applyFilter(filterValue: string) {
    this.filterDataSource.filter = filterValue.trim().toLowerCase();
  }

  add(identity: Identity) {
    var player = this.players.filter(p => p.identity == identity);
    var playerNpcShift = new PlayerNpcShift();
    playerNpcShift.npcShift = this.data;
    playerNpcShift.npcShiftId = this.data.id;
    playerNpcShift.playerId = player[0].id;

    this.npcShiftService.addPlayerToNpcShift(playerNpcShift)
      .subscribe(() => this.router.navigate(['dashboard/npc-shifts']));
  }
}
