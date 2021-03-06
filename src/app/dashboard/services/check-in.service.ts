import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
import { CheckInData } from '../models/check-in-data.interface';
import { Cart } from '../models/cart';
import { catchError } from 'rxjs/operators';
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

  checkIn(cart: Cart): Observable<number> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.put<number>(`${this.checkInUrl}`, cart, httpOptions)
      .pipe(catchError(this.handleError));
  }

}
