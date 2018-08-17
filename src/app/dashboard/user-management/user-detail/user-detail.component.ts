import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';
import { Player } from '../../models/player.interface';
import { MatDialog } from '@angular/material';
import { CharacterDetailComponent } from '../../character-detail/character-detail.component';
import { Character } from '../../models/character.interface';
import { CharacterService } from '../../services/character.service';
import { CharacterMetadata } from '../../models/character.metadata.interface';
import { AddCharacterDialogData } from '../../models/add-character.interface';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  player: Player;
  userForm: FormGroup;
  characters: Character[];
  displayedColumns = ['name', 'species', 'occupation', 'accumulatedXP', 'actions'];
  characterMetadata = new CharacterMetadata();
  identityId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userManagementService: UserManagementService,
    private characterService: CharacterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('auth_token');
    let payload = decode(token);
    this.identityId = payload["Id"];

    this.userForm = new FormGroup ({
      playerId: new FormControl( {
        value: '', 
        disabled: true
      }, {
        validators: [Validators.required]
      }),
      firstName: new FormControl('', {
        validators: [Validators.required]
      }),
      lastName: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      emailConfirmed: new FormControl({
        value: '', 
        disabled: true
      })
    });

    this.getAndSetUsersAndCharacters();
  }

  getAndSetUsersAndCharacters(): void {
    if(this.route.snapshot.paramMap.get('id') !== 'new' &&
        this.route.snapshot.paramMap.get('id') !== null) {

      const id = this.route.snapshot.paramMap.get('id');
      
      this.userManagementService.getPlayer(id)
        .subscribe(player => {
          this.player = player;
          this.userForm.get('playerId').setValue(player.id);
          this.userForm.get('firstName').setValue(player.identity.firstName);
          this.userForm.get('lastName').setValue(player.identity.lastName);
          this.userForm.get('email').setValue(player.identity.email);
          this.userForm.get('emailConfirmed').setValue(player.identity.emailConfirmed);

          this.characterService.getPlayersCharacters(this.player.id)
            .subscribe(characters => {
              this.characters = characters;
              this.characterService.getCharacterMetadata(1)
                .subscribe(characterMetadata => {
                  this.characterMetadata = characterMetadata;
              });
            });
      });
    }
  }

  getCharacters() {
    this.characterService.getPlayersCharacters(this.player.id)
      .subscribe(characters => this.characters = characters);
  }

  delete(character: Character): void {
    this.characters = this.characters.filter(c => c !== character);
    this.characterService.deleteCharacter(character).subscribe();
  }

  openNewCharacterDialog() {
    var addCharacterDialogData = new AddCharacterDialogData();
    addCharacterDialogData.playerId = this.player.id;

    this.dialog.open(CharacterDetailComponent, {
      width: '50%',
      data: addCharacterDialogData
    });    
  }

  routeToCharacterDetail(characterId) {
    this.router.navigate(['dashboard/detail', this.player.id, {characterId:characterId}])};

  /*
  openExistingCharacterDialog(characterId: number) {
    var addCharacterDialogData = new AddCharacterDialogData();
    addCharacterDialogData.playerId = this.player.id;
    addCharacterDialogData.characterId = characterId;
    
    this.dialog.open(CharacterDetailComponent, {
      width: '50%',
      data: addCharacterDialogData
    });    
  }
  */

}
