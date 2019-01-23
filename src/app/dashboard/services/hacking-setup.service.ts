import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
import { NpcShift } from '../models/npc-shift.interface';
import { PlayerNpcShift } from '../models/player-npc-shift.interface';
import { catchError } from 'rxjs/operators';
import { Player } from '../models/player.interface';
import { HackingPuzzleRow } from '../models/hacking-puzzle-row';
import { HackingPuzzle } from '../models/hacking-puzzle';
@Injectable()
export class HackingSetupService extends BaseService {

  baseUrl = '';
  hackingUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.hackingUrl = `${this.baseUrl}/hackingpuzzle`;
  }

  createHackingPuzzle(hackingPuzzle: HackingPuzzle): Observable<boolean> {
      let httpOptions = {
          headers: new HttpHeaders(this.authorizationHeader)
      }
      return this.http.put<boolean>(`${this.hackingUrl}`, hackingPuzzle, httpOptions)
        .pipe(catchError(this.handleError));
  }
}
