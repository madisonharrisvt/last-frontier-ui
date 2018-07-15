import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx'; 
import { of } from 'rxjs/observable/of';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { User } from '../models/user.interface';

@Injectable()

export class UserManagementService extends BaseService {

  baseUrl: string = '';
  userManagementUrl = '';
  userDetailUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
    this.userManagementUrl = `${configService.getApiURI()}/usermanagement`;
    this.userDetailUrl = `${configService.getApiURI()}/userdetail`;
  }

  getCharacters(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };
    return this.http.get<User[]>(this.userManagementUrl, httpOptions);
  }

  getUser(id: string): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    }
    return this.http.get<User>(`${this.userDetailUrl}/?userId=${id}`, httpOptions);
  }

  getResponse(): Observable<string> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    }
    return this.http.get<string>(`${this.userDetailUrl}/?userId=40626a70-490a-4997-ab8a-1c9a5ab39292`, httpOptions);
  }

  //http://localhost:4200/dashboard/user-detail/40626a70-490a-4997-ab8a-1c9a5ab39292
}
