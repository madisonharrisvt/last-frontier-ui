import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacterService } from '../../services/character.service';

import { Observable ,  Subject ,  of } from 'rxjs';
import { Character } from '../../models/character.interface';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent implements OnInit {

  searchControl = new FormControl();
  characters$: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService, private router: Router) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.characters$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.characterService.searchCharacters(term)),
    );
  }

  routeToCharacterDetail(character: Character) {
    this.router.navigate(['dashboard/detail', character.playerId, {characterId:character.id}])
  };

}
