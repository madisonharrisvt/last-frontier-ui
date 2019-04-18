import { Component, OnInit } from '@angular/core';
import { NpcShift } from '../../models/npc-shift.interface';
import { NpcShiftService } from '../../services/npc-shift.service';
import { Player } from '../../models/player.interface';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material';
import { AddPlayerToNpcShiftComponent } from '../add-player-to-npc-shift/add-player-to-npc-shift.component';
import { PlayerNpcShift } from '../../models/player-npc-shift.interface';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Identity } from '../../models/identity.interface';

@Component({
  selector: 'app-all-npc-shifts',
  templateUrl: './all-npc-shifts.component.html',
  styleUrls: ['./all-npc-shifts.component.css']
})
export class AllNpcShiftsComponent implements OnInit {

  initialIdentity: Identity = { firstName: null, lastName: null, email: null, playerId: 0, emailConfirmed: false };
  initialPlayer: Player = { id: 0, identity: this.initialIdentity, role: null, volunteerPoints: 0 };
  npcShiftWithPlayer = <NpcShift> {players: [ this.initialPlayer ]};
  npcShifts: NpcShift[] = [this.npcShiftWithPlayer];
  requestFailure: boolean = false;
  errors: string = '';
  isLoading: boolean = false;

  displayedColumns = ['startDateTime', 'endDateTime', 'npcCount', 'players', 'actions'];

  constructor(private npcShiftService: NpcShiftService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getNpcShifts();
  }

  getNpcShifts() {
    this.npcShiftService.getNpcShifts()
      .subscribe(npcShifts => {
        this.isLoading = true;
        this.npcShifts = npcShifts;
        this.npcShifts.forEach(s => {
          var players = '';
          s.players.forEach(p => {
            players = players.concat(p.identity.firstName + ' ' + p.identity.lastName);
          });
          s.playerNames = players;
        });
        this.isLoading = false;
      });
  }

  getPlayers(npcShift: NpcShift): string {
    if(npcShift != null) {
      npcShift.players.toString();
    }
    
    return 'hiya bob';
  }

  addToShift(npcShift){
    this.requestFailure = false;
    const dialogRef = this.dialog.open(AddPlayerToNpcShiftComponent, {
      width: '800px',
      data: npcShift
    });
  }

  removeFromNpcShift(npcShift: NpcShift, player: Player) {
    this.requestFailure = false;
    var playerNpcShift: PlayerNpcShift = { npcShift: npcShift, npcShiftId: npcShift.id, playerId: player.id, id: 0 }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px'
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if(confirmation) {
        //this.characterEventService.removeCharacterEvent(characterEvent).subscribe(() => this.goBack());
        this.isLoading = true;
        this.npcShiftService.removePlayerNpcShiftNoId(playerNpcShift)
          .subscribe(
            result => {
              this.npcShifts.forEach(npcShift => {
                if (npcShift.id == npcShift.id) {
                  npcShift.players = npcShift.players.filter(p => p.id != player.id);
                  npcShift.npcCount = npcShift.players.length;
                }
              });
              this.isLoading = false;
            },
            error => {
              this.isLoading = false;
              this.requestFailure = true;
              this.errors = error;
            }
          )
      }
    });
  }
}
