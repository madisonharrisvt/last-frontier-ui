import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Character } from '../models/character.interface';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx'; 
import { of } from 'rxjs/observable/of';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class CharacterService extends BaseService {

  baseUrl: string = '';
  characterListUrl: string = '';
  characterUrl: string = '';
  characterSearchUrl: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
     this.characterListUrl = `${configService.getApiURI()}/characterlist`;
     this.characterUrl = `${configService.getApiURI()}/characterdetail`;
     this.characterSearchUrl = `${configService.getApiURI()}/charactersearch`;
  }

  getCharacters(): Observable<Character[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };

    return this.http.get<Character[]>(this.characterListUrl, httpOptions) ;
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

  addCharacter (character: Character): Observable<Character> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };
    
    return this.http.post<Character>(this.characterListUrl, character, httpOptions);
  }

}