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

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  newPlayer = new AddPlayerDialogData();
  newCharacter = new Character();
  activeEvent = new LFEvent();
  checkInForm: FormGroup;

  constructor(
    private router: Router,
    private lfeventService: LfeventService,
    private characterService: CharacterService,
    private userManagementService: UserManagementService,
    private checkInService: CheckInService
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
    this.newPlayer.email = this.checkInForm.value.email;
    this.newCharacter.name = this.checkInForm.value.characterName;

    this.checkInService.createPlayerByEmail(this.newPlayer)
      .subscribe(playerId => {
        var skills: Skill[] = [];

        this.newCharacter.playerId = playerId;
        this.newCharacter.skills = skills;
        this.characterService.updateCharacter(this.newCharacter)
          .subscribe(() => {
            this.router.navigateByUrl(`/dashboard/user-detail/${this.newCharacter.playerId}`);
          });
      });
  }

}
