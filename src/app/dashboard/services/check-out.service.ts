import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class CheckOutService extends BaseService {

  baseUrl = '';
  checkOutUrl = '';
  daveUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.checkOutUrl = `${this.baseUrl}/checkout`;
    this.daveUrl = `${this.baseUrl}/dave`;
  }

  checkOut(token: any): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.post<Object>(`${this.checkOutUrl}`, token, httpOptions)
      .pipe(catchError(this.handleError));
  }

  DaveCheckOut(token: any): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.post<Object>(`${this.daveUrl}`, token, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
