import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterService }  from '../../services/character.service';

import { Character } from '../../models/character.interface';
import { Skill } from '../../models/skill.interface';
import { CharacterMetadata } from '../../models/character.metadata.interface';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent implements OnInit {

  character = new Character();
  characterMetadata = new CharacterMetadata();
  characterIdFromRoute: string;
  playerIdFromRoute: string;
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
    });
  this.getCharacter();
  }

  getCharacter() {
    var occupationId = 0;
    this.playerIdFromRoute = this.route.snapshot.paramMap.get('id');
    this.characterIdFromRoute = this.route.snapshot.paramMap.get('characterId');

    if(this.characterIdFromRoute !== 'new' && this.characterIdFromRoute !== null) {

      this.characterService.getCharacter(+this.characterIdFromRoute)
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

          occupationId = character.occupation;

          for(let skill of character.skills) {
            this.initializeSkills(skill.skillId, skill.masteryLevel);
          }

          this.characterService.getCharacterMetadata(occupationId)
            .subscribe(characterMetadata => {
              this.characterMetadata = characterMetadata;
            });
        });
    } else {
        this.characterForm.get('status').setValue(1);
        this.characterForm.get('cloneStatus').setValue(0);
        this.characterForm.get('torso').setValue(10);
        this.characterForm.get('rightArm').setValue(10);
        this.characterForm.get('leftArm').setValue(10);
        this.characterForm.get('rightLeg').setValue(10);
        this.characterForm.get('leftLeg').setValue(10);
    }

    this.characterService.getCharacterMetadata(occupationId)
      .subscribe(characterMetadata => {
        this.characterMetadata = characterMetadata;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.character == null) {
      this.character = new Character();
    }

    // TODO: See if I can make this less terrible
    this.character.playerId = +this.playerIdFromRoute;
    this.character.id = +this.characterIdFromRoute;
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
        skillId: this.characterForm.controls['skill' + index].value,
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

  addCloneModifiers() {
    var currentTorsoHealth = this.characterForm.value.torso;

    if(this.characterForm.value.cloneStatus) {
      this.characterForm.get('torso').setValue(currentTorsoHealth + 1);
    } else {
      this.characterForm.get('torso').setValue(currentTorsoHealth - 1)
    }
  }

  updateAvailableSideGigs() {
    var chosenOccupation = this.characterForm.value.occupation;
    this.characterService.getSideGigs(chosenOccupation)
      .subscribe(sideGigs => {
        this.characterMetadata.sideGigs = sideGigs;
      });
  }
}