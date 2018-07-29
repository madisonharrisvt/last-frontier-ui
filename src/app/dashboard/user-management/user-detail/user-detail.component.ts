import { Component, OnInit } from '@angular/core';
import { Identity } from '../../models/identity.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';
import { Player } from '../../models/player.interface';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { CharacterDetailComponent } from '../../character-detail/character-detail.component';
import { Character } from '../../models/character.interface';
import { CharacterService } from '../../services/character.service';
import { CharacterMetadata } from '../../models/character.metadata.interface';
import { AddCharacterDialogData } from '../../models/add-character.interface';

// Name, species, primary job, total XP

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

  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private characterService: CharacterService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup ({
      firstName: new FormControl('', {
        validators: [Validators.required]
      }),
      lastName: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      emailConfirmed: new FormControl()
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

  openExistingCharacterDialog(characterId: number) {
    var addCharacterDialogData = new AddCharacterDialogData();
    addCharacterDialogData.playerId = this.player.id;
    addCharacterDialogData.characterId = characterId;
    
    this.dialog.open(CharacterDetailComponent, {
      width: '50%',
      data: addCharacterDialogData
    });    
  }

}
