import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharacterService } from '../../services/character.service';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';
import { Character } from '../../models/character.interface';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent implements OnInit {

  searchControl = new FormControl();
  characters$: Observable<Character[]>;
  private searchTerms = new Subject<string>();

  constructor(private characterService: CharacterService) { }

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

}
