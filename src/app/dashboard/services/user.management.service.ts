import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable ,  of } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { Identity } from '../models/identity.interface';
import { AddPlayerDialogData } from '../models/add-player.interface';
import { Player } from '../models/player.interface';

@Injectable()

export class UserManagementService extends BaseService {

  baseUrl: string = '';
  userManagementUrl = '';
  userDetailUrl = '';
  roleUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, 'Content-Type': 'application/json' };

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
    this.userManagementUrl = `${configService.getApiURI()}/usermanagement`;
    this.userDetailUrl = `${configService.getApiURI()}/userdetail`;
    this.roleUrl = `${configService.getApiURI()}/role`;
  }

  getPlayers(): Observable<Player[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    };
    return this.http.get<Player[]>(this.userManagementUrl, httpOptions);
  }

  getPlayer(id: number): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.get<Object>(`${this.userDetailUrl}/?playerId=${id}`, httpOptions);
  }

  createPlayerByEmail(newPlayer: AddPlayerDialogData): Observable<number> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put<number>(`${this.userManagementUrl}`, newPlayer, httpOptions);
  }
  
  updatePlayer(player: Player) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put(`${this.userDetailUrl}`, player, httpOptions);
  }

  deletePlayer(player: Player) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    };
    const url = `${this.userDetailUrl}/${player.id}`;
    return this.http.delete(url, httpOptions);
  }

  addUserToRole(email: string, role: string) {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    };

    let body = JSON.stringify({ email, role});

    return this.http.put(`${this.roleUrl}`, body, httpOptions);

  }

}
