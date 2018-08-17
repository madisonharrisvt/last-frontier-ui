import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { BaseService } from '../../shared/services/base.service';
import { Event } from '../models/event.interface';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable()
export class EventService extends BaseService {

  baseURL = '';
  eventDetailUrl = '';
  eventListUrl = '';
  httpHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` };

  constructor(private http: HttpClient, private configService: ConfigService) { 
    super();
    this.baseURL = configService.getApiURI();
    this.eventDetailUrl = `${this.baseURL}/eventdetail`;
    this.eventListUrl = `${this.baseURL}/eventlist`;
  }

  getEvents(): Observable<Event[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<Event[]>(this.eventListUrl, httpOptions);
  }

  updateEvent(event: Event): Observable<Event> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.put<Event>(this.eventDetailUrl, event, httpOptions);
  }

}
