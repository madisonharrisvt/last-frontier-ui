import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../services/user.management.service';
import { Player } from '../../models/player.interface';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CharacterDetailComponent } from '../../character/character-detail/character-detail.component';
import { Character } from '../../models/character.interface';
import { CharacterService } from '../../services/character.service';
import { CharacterMetadata } from '../../models/character.metadata.interface';
import { AddCharacterDialogData } from '../../models/add-character.interface';
import * as decode from 'jwt-decode';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  playerId: number;
  player = new Player();
  userForm: FormGroup;
  characters: Character[] = null;
  displayedColumns = ['name', 'species', 'occupation', 'accumulatedXP', 'actions'];
  characterMetadata: CharacterMetadata = null;
  identityId: string;
  role = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userManagementService: UserManagementService,
    private characterService: CharacterService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl('', {
        validators: [Validators.required]
      }),
      emailConfirmed: new FormControl({
        value: '', 
        disabled: true
      }),
      volunteerPoints: new FormControl()
    });

    this.getAndSetUsersAndCharacters();
  }

  getAndSetUsersAndCharacters(): void {
    if(this.route.snapshot.paramMap.get('id') !== 'new' &&
        this.route.snapshot.paramMap.get('id') !== null) {

      this.playerId = +this.route.snapshot.paramMap.get('id');
      
      this.userManagementService.getPlayer(this.playerId)
        .subscribe(response => {
          this.role = response["role"];
          this.player.id = response["Id"];
          this.player.identity = response["Identity"];
          this.player.volunteerPoints = response["VolunteerPoints"];
          this.userForm.get('playerId').setValue(response["Id"]);
          this.userForm.get('firstName').setValue(response["Identity"]["FirstName"]);
          this.userForm.get('lastName').setValue(response["Identity"]["LastName"]);
          this.userForm.get('email').setValue(response["Identity"]["Email"]);
          this.userForm.get('emailConfirmed').setValue(response["Identity"]["EmailConfirmed"]);
          this.userForm.get('volunteerPoints').setValue(response["VolunteerPoints"]);

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

  save() {
    this.loadingService.startLoading();
    this.player.id = this.playerId;
    this.player.identity.firstName = this.userForm.value.firstName;
    this.player.identity.lastName = this.userForm.value.lastName;
    this.player.identity.email = this.userForm.value.email;
    this.player.volunteerPoints = this.userForm.value.volunteerPoints;

    this.userManagementService.updatePlayer(this.player)
      .subscribe(() => {
        this.snackBar.open("Player data updated!", "Done", {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.loadingService.endLoading();
      });
  }

  goBack() {
    this.location.back();
  }

  getCharacters() {
    this.characterService.getPlayersCharacters(this.player.id)
      .subscribe(characters => this.characters = characters);
  }

  delete(character: Character): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: `This will delete character ${character.name}`
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if(confirmation) {
        this.characters = this.characters.filter(c => c !== character);
        this.characterService.deleteCharacter(character).subscribe();
      }
    });
  }

  openNewCharacterDialog() {
    var addCharacterDialogData = new AddCharacterDialogData();
    addCharacterDialogData.playerId = this.player.id;

    this.dialog.open(CharacterDetailComponent, {
      width: '50%',
      data: addCharacterDialogData
    });    
  }

  getSpecies(character: Character): string {
    var species = null; 
    if(this.characterMetadata !== null &&
        character.species !== null) {
      species = this.characterMetadata.species.filter(s => s.id == character.species)[0].name;
    }
    return species;
  }

  getOccupation(character: Character): string {
    var occupation = null; 
    if(this.characterMetadata !== null &&
        character.occupation !== null) {
      occupation = this.characterMetadata.occupations.filter(o => o.id == character.occupation)[0].name;
    }
    return occupation;
  }

  routeToCharacterDetail(characterId) {
    this.router.navigate(['dashboard/detail', this.player.id, {characterId:characterId}])
  };

  promoteToAdmin() {
    var email = this.player.identity["Email"];
    this.userManagementService.addUserToRole(email, "Admin")
      .subscribe(() => this.role = "Admin");
  }

  promoteToStaff() {
    var email = this.player.identity["Email"];
    this.userManagementService.addUserToRole(email, "Staff")
      .subscribe(() => this.role = "Staff");
  }
}
