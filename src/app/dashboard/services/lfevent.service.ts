import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../shared/utils/config.service';
import { BaseService } from '../../shared/services/base.service';
import { LFEvent } from '../models/event.interface';
import { Observable } from 'rxjs';

@Injectable()
export class LfeventService extends BaseService {

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

  getEvents(): Observable<LFEvent[]> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<LFEvent[]>(this.eventListUrl, httpOptions);
  }

  getEvent(id: number): Observable<LFEvent> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.get<LFEvent>(`${this.eventDetailUrl}/?eventId=${id}`, httpOptions)
  }

  updateEvent(event: LFEvent): Observable<LFEvent> {
    let httpOptions = {
      headers: new HttpHeaders(this.httpHeader)
    };

    return this.http.put<LFEvent>(this.eventDetailUrl, event, httpOptions);
  }

}
