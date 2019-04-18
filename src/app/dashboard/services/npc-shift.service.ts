import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
import { NpcShift } from '../models/npc-shift.interface';
import { PlayerNpcShift } from '../models/player-npc-shift.interface';
import { catchError } from 'rxjs/operators';
import { Player } from '../models/player.interface';
@Injectable()
export class NpcShiftService extends BaseService {

  baseUrl = '';
  npcShiftUrl = '';
  playerNpcShiftUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.npcShiftUrl = `${this.baseUrl}/npcshift`;
    this.playerNpcShiftUrl = `${this.baseUrl}/playernpcshift`;
  }

  getNpcShifts(): Observable<NpcShift[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.get<NpcShift[]>(`${this.npcShiftUrl}`, httpOptions);
  }

  addPlayerToNpcShift(playerNpcShift: PlayerNpcShift) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put(`${this.npcShiftUrl}`, playerNpcShift, httpOptions);
  }

  getPlayersWithoutNpcShiftForActiveEvent(): Observable<Player[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.get<Player[]>(`${this.playerNpcShiftUrl}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  removePlayerNpcShift(playerNpcShift: PlayerNpcShift) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.delete(`${this.playerNpcShiftUrl}/${playerNpcShift.id}`, httpOptions)
      .pipe(catchError(this.handleError)); 
  }

  removePlayerNpcShiftNoId(playerNpcShift: PlayerNpcShift) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.delete(`${this.npcShiftUrl}/${playerNpcShift.npcShiftId}_${playerNpcShift.playerId}`, httpOptions)
      .pipe(catchError(this.handleError)); 
  }
}
