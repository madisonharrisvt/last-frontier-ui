import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../services/user.management.service';
import { AddPlayerDialogData } from '../models/add-player.interface';
import { LFEvent } from '../models/event.interface';
import { LfeventService } from '../services/lfevent.service';
import { CharacterService } from '../services/character.service';
import { Character } from '../models/character.interface';
import { Skill } from '../models/skill.interface';
import { CheckInService } from '../services/check-in.service';
import { CheckInData } from '../models/check-in-data.interface';
import { MatDialog } from '@angular/material';
import { NpcShiftsComponent } from '../npc/npc-shifts/npc-shifts.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  checkInData = new CheckInData();
  newCharacter = new Character();
  activeEvent = new LFEvent();
  checkInForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private lfeventService: LfeventService,
    private characterService: CharacterService,
    private userManagementService: UserManagementService,
    private checkInService: CheckInService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkInForm = new FormGroup( {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      characterName: new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.getActiveEvent();
  }

  getActiveEvent() {
    this.lfeventService.getActiveEvent()
      .subscribe(activeEvent => this.activeEvent = activeEvent);
  }

  checkIn() {
    this.isLoading = true;
    var skills: Skill[] = [];
    this.newCharacter.name = this.checkInForm.value.characterName;
    this.newCharacter.skills = skills;

    this.checkInData.newPlayerEmail = this.checkInForm.value.email;
    this.checkInData.newCharacter = this.newCharacter; 
    this.checkInData.event = this.activeEvent;

    this.checkInService.checkIn(this.checkInData)
      .subscribe(playerId => {
        this.openDialog(playerId);
        this.isLoading = false;
      });
  }
  
  openDialog(playerId: number) {
    const dialogRef = this.dialog.open(NpcShiftsComponent, {
      width: '800px',
      data: playerId
    });
    
    dialogRef.afterClosed()
      .subscribe(() => this.router.navigateByUrl(`/dashboard/user-detail/${playerId}`));
  }
}
