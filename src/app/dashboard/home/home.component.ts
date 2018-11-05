import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../services/user.management.service';
import { Player } from '../models/player.interface';
import { MatDialog } from '@angular/material';
import { CharacterDetailComponent } from '../character/character-detail/character-detail.component';
import { Character } from '../models/character.interface';
import { CharacterService } from '../services/character.service';
import { CharacterMetadata } from '../models/character.metadata.interface';
import { AddCharacterDialogData } from '../models/add-character.interface';
import * as decode from 'jwt-decode';
import { PreRegistrationService } from '../services/pre-registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  player = new Player();
  userForm: FormGroup;
  characters: Character[] = null;
  displayedColumns = ['name', 'species', 'occupation', 'accumulatedXP'];
  characterMetadata: CharacterMetadata = null;
  identityId: string;
  role = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userManagementService: UserManagementService,
    private characterService: CharacterService,
    public dialog: MatDialog,
    private playerService: PreRegistrationService
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.identityId = payload["Id"];

    this.userForm = new FormGroup ({
      playerId: new FormControl( {
        value: '', 
        disabled: true
      }),
      firstName: new FormControl( {
        value: '', 
        disabled: true
      }),
      lastName: new FormControl( {
        value: '', 
        disabled: true
      }),
      email: new FormControl({
        value: '', 
        disabled: true
      }),
      emailConfirmed: new FormControl({
        value: '', 
        disabled: true
      }),
      volunteerPoints: new FormControl({
        value: '', 
        disabled: true
      })
    });

    this.playerService.getLoggedInPlayer()
      .subscribe(player => {
        this.player = player;

        this.userForm.get('playerId').setValue(player.id);
        this.userForm.get('firstName').setValue(player.identity.firstName);
        this.userForm.get('lastName').setValue(player.identity.lastName);
        this.userForm.get('email').setValue(player.identity.email);
        this.userForm.get('volunteerPoints').setValue(player.volunteerPoints);

        this.characterService.getPlayersCharacters(player.id)
            .subscribe(characters => {
              this.characters = characters;
              this.characterService.getCharacterMetadata(1)
                .subscribe(characterMetadata => {
                  this.characterMetadata = characterMetadata;
            });
        });
      });


  }

  goBack() {
    this.location.back();
  }

  getCharacters() {
    this.characterService.getPlayersCharacters(this.player.id)
      .subscribe(characters => this.characters = characters);
  }

  getSpecies(character: Character): string {
    var species = null; 
    if(this.characterMetadata !== null &&
        character.species !== null) {
      species = this.characterMetadata.species[character.species].name
    }
    return species;
  }

  getOccupation(character: Character): string {
    var occupation = null; 
    if(this.characterMetadata !== null &&
        character.occupation !== null) {
      occupation = this.characterMetadata.occupations[character.occupation].name
    }
    return occupation;
  }

  routeToCharacterDetail(characterId) {
    this.router.navigate(['dashboard/detail', this.player.id, {characterId:characterId}])
  };
}
