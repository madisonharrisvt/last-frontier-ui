import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { AddPlayerDialogData } from '../models/add-player.interface';
import { Observable } from 'rxjs';
@Injectable()
export class CheckInService extends BaseService {

  baseUrl = '';
  checkInUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.checkInUrl = `${this.baseUrl}/CheckIn`;
  }

  createPlayerByEmail(newPlayer: AddPlayerDialogData): Observable<number> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put<number>(`${this.checkInUrl}`, newPlayer, httpOptions);
  }

}
