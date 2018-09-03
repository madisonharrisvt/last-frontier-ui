import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Character } from '../models/character.interface';
import { CharacterMetadata } from '../models/character.metadata.interface';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable ,  of } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { Metadata } from '../models/metadata.interface';

@Injectable()

export class CharacterService extends BaseService {

  baseUrl = '';
  characterListUrl = '';
  characterUrl = '';
  characterSearchUrl = '';
  characterMetadataUrl = '';
  
  httpHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
     this.characterListUrl = `${this.baseUrl}/characterlist`;
     this.characterUrl = `${this.baseUrl}/characterdetail`;
     this.characterSearchUrl = `${this.baseUrl}/charactersearch`;
     this.characterMetadataUrl = `${this.baseUrl}/charactermetadata`;
  }

  getSideGigs(occupation: number): Observable<Metadata[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };
    return this.http.post<Metadata[]>(this.characterMetadataUrl, occupation, httpOptions);
  }

  getCharacterMetadata(id: number): Observable<CharacterMetadata> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<CharacterMetadata>(`${this.characterMetadataUrl}/${id}`, httpOptions);
  }

  getCharacters(): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<Character[]>(this.characterListUrl, httpOptions);
  }

  getCharacter(id: number): Observable<Character> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<Character>(`${this.characterUrl}/${id}`, httpOptions);
  }

  updateCharacter (character: Character): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.put(this.characterUrl, character, httpOptions);
  }

  searchCharacters(term: string): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    if (!term.trim()) {
      // if not search term, return empty character array
      return of([]);
    }
    return this.http.get<Character[]>(`${this.characterSearchUrl}/${term}`, httpOptions);
  }

  deleteCharacter (character: Character): Observable<Character> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    const url = `${this.characterUrl}/${character.id}`;

    return this.http.delete<Character>(url, httpOptions);
  }

  getPlayersCharacters(playerId: number): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };
    const url = `${this.characterListUrl}/?playerId=${playerId}`;
    return this.http.get<Character[]>(url, httpOptions);
  }
}