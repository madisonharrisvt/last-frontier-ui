import { Component, OnInit } from '@angular/core';

import { Character } from '../../models/character.interface';
import { CharacterService } from '../../services/character.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[];
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private characterService: CharacterService, private router: Router) { }

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  delete(character: Character): void {
    this.characters = this.characters.filter(c => c !== character);
    this.characterService.deleteCharacter(character).subscribe();
  }
}
