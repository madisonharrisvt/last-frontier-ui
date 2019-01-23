import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Observable } from 'rxjs';
import { HackingPuzzle } from '../../dashboard/models/hacking-puzzle';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService extends BaseService {

  baseUrl = '';
  hackingUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService){ 
    super();
    this.baseUrl = configService.getApiURI();
    this.hackingUrl = `${this.baseUrl}/hackingpuzzle`;
  }

  getHackingPuzzle(): Observable<Object> {
    return this.http.get<Object>(this.hackingUrl)
      .pipe(catchError(this.handleError));
  }
}
