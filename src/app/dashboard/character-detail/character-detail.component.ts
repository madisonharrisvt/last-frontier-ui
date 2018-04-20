import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterService }  from '../services/character.service';
import { Character } from '../models/character.interface';
import { Skill } from '../models/skill.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent implements OnInit {
  
  character: Character;

  chosenSkills = [];

  species = [
    { value: 0, viewValue: "Human" },
    { value: 1, viewValue: "Halfbreed" },
    { value: 2, viewValue: "Augmented" },
    { value: 3, viewValue: "Highborne" },
    { value: 4, viewValue: "Muk'Taa" },
    { value: 5, viewValue: "Piscen" }
  ];

  stressResponses = [
    { value: 0, viewValue: "Hot Headed" },
    { value: 1, viewValue: "Hypochondriac" },
    { value: 2, viewValue: "Delusional" },
    { value: 3, viewValue: "Skittish" },
    { value: 4, viewValue: "Haughty" },
    { value: 5, viewValue: "Martyr" }
  ];

  occupations = [
    { value: 0, viewValue: "Doctor" },
    { value: 1, viewValue: "Socialite" },
    { value: 2, viewValue: "Soldier" },
    { value: 3, viewValue: "Engineer" },
    { value: 4, viewValue: "Prospector" }
  ];

  sideGigs = [
    { value: 0, viewValue: "Doctor" },
    { value: 1, viewValue: "Socialite" },
    { value: 2, viewValue: "Soldier" },
    { value: 3, viewValue: "Engineer" },
    { value: 4, viewValue: "Prospector" }
  ];

  statuses = [
    { value: 0, viewValue: "Active" },
    { value: 1, viewValue: "Dead" },
    { value: 2, viewValue: "Retired" },
  ];

  skills = [
    { value: 0, viewValue: "Firearms" },
    { value: 1, viewValue: "Emergency First Aide" },
    { value: 2, viewValue: "Frontier Medicine" },
    { value: 3, viewValue: "Harvest" },
    { value: 4, viewValue: "Vat Cultures" },
    { value: 5, viewValue: "Mangle Arm" },
    { value: 6, viewValue: "Recharge" },
    { value: 7, viewValue: "Psychological Counseling " },
    { value: 8, viewValue: "Mixology" },
    { value: 9, viewValue: "Data Mining" },
    { value: 10, viewValue: "Intimidate" },
    { value: 11, viewValue: "Nanomachine Transference" },
    { value: 12, viewValue: "Disarm" },
    { value: 13, viewValue: "Protect" },
    { value: 14, viewValue: "Mangle Leg" },
    { value: 15, viewValue: "Repair" },
    { value: 16, viewValue: "Fabricate" },
    { value: 17, viewValue: "Hacking" },
    { value: 18, viewValue: "Break Armor" },
    { value: 19, viewValue: "Detect" },
    { value: 20, viewValue: "Mining" },
    { value: 21, viewValue: "Refining" },
    { value: 22, viewValue: "Trip" },
    { value: 23, viewValue: "Camouflage" },
    { value: 24, viewValue: "Forecasting" },
  ];

  characterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.characterForm = new FormGroup( {
      name: new FormControl('', {         updateOn: 'change'       }),
      species: new FormControl('', {         updateOn: 'change'       }),
      stressResponse: new FormControl('', {         updateOn: 'change'       }),
      hStatus: new FormControl('', {         updateOn: 'change'       }),
      cloneStatus: new FormControl('', {         updateOn: 'change'       }),
      occupation: new FormControl('', {         updateOn: 'change'       }),
      sideGig: new FormControl('', {         updateOn: 'change'       }),
      accumulatedXP: new FormControl('', {         updateOn: 'change'       }),
      availableXP: new FormControl('', {         updateOn: 'change'       }),
      status: new FormControl('', {         updateOn: 'change'       }),
      torso: new FormControl('', {         updateOn: 'change'       }),
      rightArm: new FormControl('', {         updateOn: 'change'       }),
      leftArm: new FormControl('', {         updateOn: 'change'       }),
      rightLeg: new FormControl('', {         updateOn: 'change'       }),
      leftLeg: new FormControl('', {         updateOn: 'change'       })
    })
    this.getCharacter();
  }

  getCharacter(): void {

    if(this.route.snapshot.paramMap.get('id') !== null) {
      const id = this.route.snapshot.paramMap.get('id');
      this.characterService.getCharacter(id)
        .subscribe(character => this.character = character);
    }
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    if(this.character !== null) {

      this.character.name = this.characterForm.value.name;
      this.character.accumulatedXP = this.characterForm.value.accumulatedXP;
      this.character.availableXP = this.characterForm.value.accumulatedXP;
      this.character.species = this.characterForm.value.species;
      this.character.stressResponse = this.characterForm.value.stressResponse;
      this.character.hStatus = this.characterForm.value.hStatus;
      this.character.cloneStatus = this.characterForm.value.cloneStatus;
      this.character.occupation = this.characterForm.value.occupation;
      this.character.sideGig = this.characterForm.value.sideGig;
      this.character.status = this.characterForm.value.status;
      this.character.torsoHealth = this.characterForm.value.torsoHealth;
      this.character.rightArmHealth = this.characterForm.value.rightArmHealth;
      this.character.leftArmHealth = this.characterForm.value.leftArmHealth;
      this.character.rightLegHealth = this.characterForm.value.rightLegHealth;
      this.character.leftLegHealth = this.characterForm.value.leftLegHealth;

      /*var skills: Skill[];

      for (let skill of this.chosenSkills) {
        var skillToAdd: Skill = {
          name: skill.viewValue,
          masteryLvl: skill.viewValue
        };

        skills.push(skillToAdd);
      }

      this.character.skills = skills;
      */
     
      this.characterService.updateCharacter(this.character)
      .subscribe(() => this.goBack());
    }
  }

  addSkill() {
    this.chosenSkills.push({ value: "firearms-0", viewValue: "Firearms" });
  }

  deleteSkill(skill) {
    var index = this.chosenSkills.indexOf(skill);
    this.chosenSkills.splice(index,1);
  }
}