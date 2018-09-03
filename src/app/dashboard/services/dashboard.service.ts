import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HomeDetails } from '../models/home.details.interface'; 
import { ConfigService } from '../../shared/utils/config.service';

import {BaseService} from '../../shared/services/base.service';

import { Observable } from 'rxjs'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = ''; 
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }

    return this.http.get<HomeDetails>(this.baseUrl + "/dashboard/home",httpOptions);
  } 
}