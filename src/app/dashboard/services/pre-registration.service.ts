import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
import { Character } from '../models/character.interface';
import { PreRegistrationPlayerInfo } from '../models/pre-registration-player-character-info';
import { Player } from '../models/player.interface';
import { Cart } from '../models/cart';
import { catchError } from 'rxjs/operators';
@Injectable()
export class PreRegistrationService extends BaseService {

  baseUrl = '';
  preRegistrationUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.preRegistrationUrl = `${this.baseUrl}/PreRegistration`;
  }

  getLoggedInPlayer(): Observable<Player> {
      let httpOptions = {
        headers: new HttpHeaders(this.authorizationHeader)
      }
      return this.http.get<Player>(this.preRegistrationUrl, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createCart(cart: Cart): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put<any>(this.preRegistrationUrl, cart, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
