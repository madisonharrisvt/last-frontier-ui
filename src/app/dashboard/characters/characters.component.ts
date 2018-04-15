import { Component, OnInit } from '@angular/core';

import { Character } from '../models/character.interface';
import { CharacterService } from '../services/character.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[];
  displayedColumns = ['id', 'name', 'actions'];

  characterForm: FormGroup;

  constructor(private characterService: CharacterService, private router: Router) { }

  ngOnInit() {
    this.characterForm = new FormGroup( {
      characterName: new FormControl('', {
        validators: Validators.nullValidator,
        updateOn: 'submit'
      })
    })
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  click(row): void {
    console.log("hiya :)");
  }

  delete(character: Character): void {
    this.characters = this.characters.filter(c => c !== character);
    this.characterService.deleteCharacter(character).subscribe();
  }

  add() {
    //this.character.name = this.characterForm.value.characterName;
    // this.characterForm.value.characterName.trim();
    const name =  this.characterForm.value.characterName.trim();
    if(!name) {return}
    this.characterService.addCharacter({ name } as Character)
      .subscribe(character => {
        if (character) {
          this.router.navigate([`/dashboard/detail/${character.id}`]);             
       }
      });
  }

}
