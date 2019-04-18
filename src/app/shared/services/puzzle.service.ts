import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Observable } from 'rxjs';
import { HackingPuzzle } from '../../dashboard/models/hacking-puzzle';
import { catchError } from 'rxjs/operators';
import { HackingPuzzleRow } from '../../dashboard/models/hacking-puzzle-row';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService extends BaseService {

  baseUrl = '';
  hackingUrl = '';
  hackingLiveUrl='';
  hackingLoginUrl='';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http: HttpClient, private configService: ConfigService){ 
    super();
    this.baseUrl = configService.getApiURI();
    this.hackingUrl = `${this.baseUrl}/hackingpuzzle`;
    this.hackingLiveUrl = `${this.baseUrl}/hackingpuzzlelive`;
    this.hackingLoginUrl = `${this.baseUrl}/hackingpuzzlelogin`;
  }

  resetAttempts(): Observable<Object> {
    return this.http.get<Object>(this.hackingUrl)
      .pipe(catchError(this.handleError));
  }

  getAttempts(): Observable<Object> {
    return this.http.get<Object>(this.hackingLiveUrl)
      .pipe(catchError(this.handleError));
  }

  submitAnswer(wordSelected: string): Observable<Object> {
    var code = {'code': wordSelected};
    return this.http.put<Object>(this.hackingLiveUrl, code)
      .pipe(catchError(this.handleError));
  }

  login(password: string): Observable<Object> {
  return this.http.get<Object>(`${this.hackingLoginUrl}/${password}`)
      .pipe(catchError(this.handleError));
  }
}
