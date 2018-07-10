import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs/Rx'; 
import { of } from 'rxjs/observable/of';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class UserManagementService extends BaseService {

  baseUrl: string = '';
  userManagementUrl = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.baseUrl = configService.getApiURI();
    this.userManagementUrl = `${configService.getApiURI()}/usermanagement`;
  }

  getCharacters(): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` })
    };
    return this.http.get<Object[]>(this.userManagementUrl, httpOptions);
  }
}
