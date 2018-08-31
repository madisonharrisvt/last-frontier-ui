import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NpcShiftService } from '../../services/npc-shift.service';
import { NpcShift } from '../../models/npc-shift.interface';
import { PlayerNpcShift } from '../../models/player-npc-shift.interface';

@Component({
  selector: 'app-npc-shifts',
  templateUrl: './npc-shifts.component.html',
  styleUrls: ['./npc-shifts.component.css']
})
export class NpcShiftsComponent implements OnInit {

  npcShifts: NpcShift[] = [];

  displayedColumns = ['startDateTime', 'endDateTime', 'npcCount', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<NpcShiftsComponent>,
    private router: Router,
    private npcShiftService: NpcShiftService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { dialogRef.disableClose = true; }

  ngOnInit() {
    this.getNpcShifts();
  }

  getNpcShifts() {
    this.npcShiftService.getNpcShifts()
      .subscribe(npcShifts => {
        this.npcShifts = npcShifts;
      });
  }

  addToShift(npcShift: NpcShift) {
    var playerNpcShift = new PlayerNpcShift();
    playerNpcShift.npcShiftId = npcShift.id;
    playerNpcShift.playerId = this.data;
    playerNpcShift.npcShift = npcShift;

    this.npcShiftService.addPlayerToNpcShift(playerNpcShift)
      .subscribe(() => this.dialogRef.close());
  }
}
