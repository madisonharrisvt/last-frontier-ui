import { Component, OnInit } from '@angular/core';
import { NpcShift } from '../../models/npc-shift.interface';
import { NpcShiftService } from '../../services/npc-shift.service';
import { Player } from '../../models/player.interface';
import { forEach } from '@angular/router/src/utils/collection';
import { MatDialog } from '@angular/material';
import { AddPlayerToNpcShiftComponent } from '../add-player-to-npc-shift/add-player-to-npc-shift.component';

@Component({
  selector: 'app-all-npc-shifts',
  templateUrl: './all-npc-shifts.component.html',
  styleUrls: ['./all-npc-shifts.component.css']
})
export class AllNpcShiftsComponent implements OnInit {

  npcShiftWithPlayer = <NpcShift> {players: [new Player()]};
  npcShifts: NpcShift[] = [this.npcShiftWithPlayer];

  displayedColumns = ['startDateTime', 'endDateTime', 'npcCount', 'players', 'actions'];

  constructor(private npcShiftService: NpcShiftService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getNpcShifts();
  }

  getNpcShifts() {
    this.npcShiftService.getNpcShifts()
      .subscribe(npcShifts => {
        this.npcShifts = npcShifts;
        this.npcShifts.forEach(s => {
          var players = '';
          s.players.forEach(p => {
            players = players.concat(p.identity.email + ' ');
          });
          s.playerEmails = players;
        });
      });
  }

  getPlayers(npcShift: NpcShift): string {
    if(npcShift != null) {
      npcShift.players.toString();
    }
    
    return 'hiya bob';
  }

  addToShift(npcShift){
    const dialogRef = this.dialog.open(AddPlayerToNpcShiftComponent, {
      width: '800px',
      data: npcShift
    });
  }
}
