import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { CharacterEvent } from '../models/character-event.interface';
import { Observable } from 'rxjs';
import { PlayerCharacter } from '../models/player-character.interface';

@Injectable()
export class CharacterEventService extends BaseService {
  
  baseUrl = '';
  characterEventUrl = '';
  allCharactersUrl = '';
  eventCharactersUrl = '';
  httpHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.characterEventUrl = `${this.baseUrl}/characterevents`;
    this.allCharactersUrl = `${this.baseUrl}/allcharacters`;
    this.eventCharactersUrl = `${this.baseUrl}/eventcharacters`;
  }

  getCharacterEvents(id: number): Observable<CharacterEvent[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<CharacterEvent[]>(`${this.characterEventUrl}/${id}`, httpOptions);
  }

  getAllCharacters(): Observable<PlayerCharacter[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<PlayerCharacter[]>(this.allCharactersUrl, httpOptions);
  }
  
  addCharacterToEvent(playerCharacter: PlayerCharacter, eventId: number) {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };
    var body = {
      characterId: playerCharacter.characterId,
      eventId: eventId
    }

    return this.http.put(`${this.characterEventUrl}`, body, httpOptions);
  }

  getEventsCharacters(id: number): Observable<CharacterEvent[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<CharacterEvent[]>(`${this.eventCharactersUrl}/${id}`, httpOptions);
  }

  saveCharacterEvent(characterEvent: CharacterEvent) {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.put(`${this.eventCharactersUrl}`, characterEvent, httpOptions);
  }

}
