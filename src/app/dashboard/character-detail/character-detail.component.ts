import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterService }  from '../services/character.service';
import { Character } from '../models/character.interface';
import { Skill } from '../models/skill.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { nextTick } from 'q';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent implements OnInit {
  
  character: Character;

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
      name: new FormControl('', {   
        validators: [Validators.required]     
      }),
      species: new FormControl(),
      stressResponse: new FormControl(),
      hStatus: new FormControl(),
      cloneStatus: new FormControl(),
      occupation: new FormControl(),
      sideGig: new FormControl(),
      accumulatedXP: new FormControl(),
      availableXP: new FormControl(),
      status: new FormControl(),
      torso: new FormControl(),
      rightArm: new FormControl(),
      leftArm: new FormControl(),
      rightLeg: new FormControl(),
      leftLeg: new FormControl()
    })
  this.getCharacter();
  }

  getCharacter(): void {
    if(this.route.snapshot.paramMap.get('id') !== null) {
      const id = this.route.snapshot.paramMap.get('id');
      this.characterService.getCharacter(id)
        .subscribe(character => {
          this.character = character;
          this.characterForm.get('name').setValue(character.name);
          this.characterForm.get('accumulatedXP').setValue(character.accumulatedXP);
          this.characterForm.get('availableXP').setValue(character.availableXP);
          this.characterForm.get('species').setValue(character.species);
          this.characterForm.get('stressResponse').setValue(character.stressResponse);
          this.characterForm.get('hStatus').setValue(character.hStatus);
          this.characterForm.get('cloneStatus').setValue(character.cloneStatus);
          this.characterForm.get('occupation').setValue(character.occupation);
          this.characterForm.get('sideGig').setValue(character.sideGig);
          this.characterForm.get('status').setValue(character.status);
          this.characterForm.get('torso').setValue(character.torsoHealth);
          this.characterForm.get('rightArm').setValue(character.rightArmHealth);
          this.characterForm.get('leftArm').setValue(character.leftArmHealth);
          this.characterForm.get('rightLeg').setValue(character.rightLegHealth);
          this.characterForm.get('leftLeg').setValue(character.leftLegHealth);

          for(let skill of character.skills) {
            this.initializeSkills(skill.nameValue, skill.masteryLevel);
          }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    if(this.character == null) {
      this.character = new Character();
      this.character.id = this.newGuid();
    }
    this.character.name = this.characterForm.value.name;
    this.character.accumulatedXP = this.characterForm.value.accumulatedXP;
    this.character.availableXP = this.characterForm.value.availableXP;
    this.character.species = this.characterForm.value.species;
    this.character.stressResponse = this.characterForm.value.stressResponse;
    this.character.hStatus = this.characterForm.value.hStatus;
    this.character.cloneStatus = this.characterForm.value.cloneStatus;
    this.character.occupation = this.characterForm.value.occupation;
    this.character.sideGig = this.characterForm.value.sideGig;
    this.character.status = this.characterForm.value.status;
    this.character.torsoHealth = this.characterForm.value.torso;
    this.character.rightArmHealth = this.characterForm.value.rightArm;
    this.character.leftArmHealth = this.characterForm.value.leftArm;
    this.character.rightLegHealth = this.characterForm.value.rightLeg;
    this.character.leftLegHealth = this.characterForm.value.leftLeg;

    var skills: Skill[] = [];

    for (let index of this.getSkillIndices()) {

      var skillToAdd: Skill = {
        skillId: this.newGuid(),
        nameValue: this.characterForm.controls['skill' + index].value,
        masteryLevel: this.characterForm.controls['mastery' + index].value,
        characterId: this.character.id
      };

      skills.push(skillToAdd);
    }

    this.character.skills = skills;
    
    this.characterService.updateCharacter(this.character)
    .subscribe(() => this.goBack());
  }

  addSkill() {
    var maxSkillIndex = this.getMaxSkillIndex();
    var skill = 'skill' + (this.getSkillIndices() != null ? maxSkillIndex : 0);
    var masteryLvl = 'mastery' + (this.getSkillIndices() != null ? maxSkillIndex : 0);

    this.characterForm.addControl(skill, 
      new FormControl('', {
        validators: [Validators.required]     
      })
    );
    this.characterForm.addControl(masteryLvl, 
      new FormControl('', {
        validators: [Validators.required]     
      })
    );

    this.characterForm.controls[masteryLvl].setValue(1);
  }

  initializeSkills(id, masteryLvl) {
    var maxSkillIndex = this.getMaxSkillIndex();
    var skillControlName = 'skill' + (this.getSkillIndices() != null ? maxSkillIndex : 0);
    this.characterForm.addControl(skillControlName, new FormControl());

    var masteryLvlControlName = 'mastery' + (this.getSkillIndices() != null ? maxSkillIndex : 0);
    this.characterForm.addControl(masteryLvlControlName, 
      new FormControl('', {
        validators: [Validators.required]     
      })
    );
    this.characterForm.controls[skillControlName].setValue(id);
    this.characterForm.controls[masteryLvlControlName].setValue(masteryLvl);
  }

  getSkillIndices(): Array<number> {
    var skillIndices = [];
    var formControls = this.characterForm.controls;

    for (let key of Object.keys(formControls)) {
      if(key.includes('skill')) {
        var index = key.split('skill')[1];
        skillIndices.push(index);
      }
    }
    return skillIndices;
  }

  getSkillMasteries() {
    var chosenSkillMastery: Array<Object> = [];
    var formControls = this.characterForm.controls;

    for (let key of Object.keys(formControls)) {
      if(key.includes('mastery')) {
        var masteryToAdd = formControls[key];
        masteryToAdd['id'] = key;
        chosenSkillMastery.push(masteryToAdd);
      }
    }
    return chosenSkillMastery;
  }

  getMaxSkillIndex(): number {
    var maxIndex = 0;
    var formControls = this.characterForm.controls;

    for (let key of Object.keys(formControls)) {
      if(key.includes('skill')) {
        var skillIndex = +(key.split('skill')[1]) + 1;
        if (+skillIndex > maxIndex) {
          maxIndex = +skillIndex;
        }
      }
    }
    return maxIndex;
  }

  deleteSkill(skillIndex) {
    this.characterForm.removeControl('skill' + skillIndex);
    this.characterForm.removeControl('mastery' + skillIndex); 
  }

  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
}