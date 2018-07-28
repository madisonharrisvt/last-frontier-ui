import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Character } from '../models/character.interface';
import { CharacterMetadata } from '../models/character.metadata.interface';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 
import { of } from 'rxjs/observable/of';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { Metadata } from '../models/metadata.interface';

@Injectable()

export class CharacterService extends BaseService {

  baseUrl: string = '';
  characterListUrl: string = '';
  characterUrl: string = '';
  characterSearchUrl: string = '';
  characterMetadataUrl: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
     this.characterListUrl = `${configService.getApiURI()}/characterlist`;
     this.characterUrl = `${configService.getApiURI()}/characterdetail`;
     this.characterSearchUrl = `${configService.getApiURI()}/charactersearch`;
     this.characterMetadataUrl = `${configService.getApiURI()}/charactermetadata`;
  }

  getSideGigs(occupation: number): Observable<Metadata[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };
    return this.http.post<Metadata[]>(this.characterMetadataUrl, occupation, httpOptions);
  }

  getCharacterMetadata(id: number): Observable<CharacterMetadata> {
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    return this.http.get<CharacterMetadata>(`${this.characterMetadataUrl}/${id}`, httpOptions);
  }

  getCharacters(): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    return this.http.get<Character[]>(this.characterListUrl, httpOptions);
  }

  getCharacter(id: string): Observable<Character> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    return this.http.get<Character>(`${this.characterUrl}/${id}`, httpOptions);
  }

  updateCharacter (character: Character): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    return this.http.put(this.characterUrl, character, httpOptions);
  }

  searchCharacters(term: string): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    if (!term.trim()) {
      // if not search term, return empty character array
      return of([]);
    }
    return this.http.get<Character[]>(`${this.characterSearchUrl}/${term}`, httpOptions);
  }

  deleteCharacter (character: Character): Observable<Character> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    const url = `${this.characterUrl}/${character.id}`;

    return this.http.delete<Character>(url, httpOptions);
  }
}