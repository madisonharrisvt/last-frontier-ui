import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterService }  from '../services/character.service';
import { Character } from '../models/character.interface';
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
    { value: "human-0", viewValue: "Human" },
    { value: "halfbreed-1", viewValue: "Halfbreed" },
    { value: "augmented-2", viewValue: "Augmented" },
    { value: "highborne-3", viewValue: "Highborne" },
    { value: "muk'taa-4", viewValue: "Muk'Taa" },
    { value: "picean-5", viewValue: "Piscen" }
  ];

  stressResponses = [
    { value: "hot-headed-0", viewValue: "Hot Headed" },
    { value: "hypochondriac-1", viewValue: "Hypochondriac" },
    { value: "delusional-2", viewValue: "Delusional" },
    { value: "skittish-3", viewValue: "Skittish" },
    { value: "haughty-4", viewValue: "Haughty" },
    { value: "martyr-5", viewValue: "Martyr" }
  ];

  occupations = [
    { value: "doctor-0", viewValue: "Doctor" },
    { value: "socialite-1", viewValue: "Socialite" },
    { value: "soldier-2", viewValue: "Soldier" },
    { value: "engineer-3", viewValue: "Engineer" },
    { value: "prospector-4", viewValue: "Prospector" }
  ];

  sideGigs = [
    { value: "doctor-0", viewValue: "Doctor" },
    { value: "socialite-1", viewValue: "Socialite" },
    { value: "soldier-2", viewValue: "Soldier" },
    { value: "engineer-3", viewValue: "Engineer" },
    { value: "prospector-4", viewValue: "Prospector" }
  ];

  statuses = [
    { value: "active-0", viewValue: "Active" },
    { value: "dead-1", viewValue: "Dead" },
    { value: "retired-2", viewValue: "Retired" },
  ];

  skills = [
    { value: "firearms-0", viewValue: "Firearms" },
    { value: "emergency-first-aide-1", viewValue: "Emergency First Aide" },
    { value: "frontier-medicine-2", viewValue: "Frontier Medicine" },
    { value: "harvest-3", viewValue: "Harvest" },
    { value: "vat-cultures-4", viewValue: "Vat Cultures" },
    { value: "mangle-arm-5", viewValue: "Mangle Arm" },
    { value: "recharge-6", viewValue: "Recharge" },
    { value: "psychological-counseling-7", viewValue: "Psychological Counseling " },
    { value: "mixology-8", viewValue: "Mixology" },
    { value: "data-mining-9", viewValue: "Data Mining" },
    { value: "intimidate-10", viewValue: "Intimidate" },
    { value: "nanomachine-transference-11", viewValue: "Nanomachine Transference" },
    { value: "disarm-12", viewValue: "Disarm" },
    { value: "protect-13", viewValue: "Protect" },
    { value: "mangle-leg-14", viewValue: "Mangle Leg" },
    { value: "repair-15", viewValue: "Repair" },
    { value: "fabricate-16", viewValue: "Fabricate" },
    { value: "hacking-17", viewValue: "Hacking" },
    { value: "break-armor-18", viewValue: "Break Armor" },
    { value: "detect-19", viewValue: "Detect" },
    { value: "mining-20", viewValue: "Mining" },
    { value: "refining-21", viewValue: "Refining" },
    { value: "trip-22", viewValue: "Trip" },
    { value: "camouflage-23", viewValue: "Camouflage" },
    { value: "forecasting-24", viewValue: "Forecasting" },
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