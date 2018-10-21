import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { Observable } from 'rxjs';
@Injectable()
export class CheckOutService extends BaseService {

  baseUrl = '';
  checkOutUrl = '';
  
  authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseUrl = configService.getApiURI();
    this.checkOutUrl = `${this.baseUrl}/checkout`;
  }

  checkOut(token: any): Observable<Object> {
    let httpOptions = {
      headers: new HttpHeaders(this.authorizationHeader)
    }
    return this.http.post<Object>(`${this.checkOutUrl}`, token, httpOptions);
  }
}
