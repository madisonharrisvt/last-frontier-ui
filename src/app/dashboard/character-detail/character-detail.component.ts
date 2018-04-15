import { Component, OnInit, Input } from '@angular/core';
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
  
  @Input() character: Character;

  characterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.characterForm = new FormGroup( {
      characterName: new FormControl('', {
        updateOn: 'change'
      })
    })
    this.getCharacter();
  }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacter(id)
      .subscribe(character => this.character = character);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    this.character.name = this.characterForm.value.characterName;
    this.characterService.updateCharacter(this.character)
      .subscribe(() => this.goBack());
  }
}