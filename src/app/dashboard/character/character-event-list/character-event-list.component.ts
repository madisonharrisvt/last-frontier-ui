import { Component, OnInit } from '@angular/core';
import { CharacterEventDataSource } from '../../models/character-event.datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CharacterEvent } from '../../models/character-event.interface';
import { CharacterEventService } from '../../services/character-event.service';

@Component({
  selector: 'app-character-event-list',
  templateUrl: './character-event-list.component.html',
  styleUrls: ['./character-event-list.component.css']
})
export class CharacterEventListComponent implements OnInit {

  characterIdFromRoute: number;
  characterEventDataSource: CharacterEventDataSource;
  displayedColumnsForEvents = ['eventId', 'xpBought', 'vpToXp', 'vpToItems'];

  constructor(
    private route: ActivatedRoute,
    private characterEventService: CharacterEventService
  ) { }

  ngOnInit() {
    this.getCharacterEvents();
  }

  getCharacterEvents() {
    this.characterIdFromRoute = +this.route.snapshot.paramMap.get('characterId');

    this.characterEventService.getCharacterEvents(this.characterIdFromRoute)
      .subscribe(characterEvents => this.characterEventDataSource = new CharacterEventDataSource(characterEvents));
  }

}
