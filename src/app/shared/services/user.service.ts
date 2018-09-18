import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from './base.service';

import { Observable ,  BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class UserService extends BaseService {
    baseUrl: string = '';
    forgotPasswordUrl = '';
    resetPasswordUrl = '';

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();
    
    private loggedIn = false;
    authorizationHeader = { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, 'Content-Type': 'application/json' };

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token');
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = configService.getApiURI();
        this.forgotPasswordUrl =  `${this.baseUrl}/ForgotPassword`;
        this.resetPasswordUrl = `${this.baseUrl}/ResetPassword`;
    }

    register(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        location: string
    ): Observable<UserRegistration> {
        let httpOptions = {
            headers: new HttpHeaders(this.authorizationHeader)
          }

        let body = JSON.stringify({ email, password, firstName, lastName, location });

        return this.http.post<UserRegistration>(this.baseUrl + "/accounts", body, httpOptions)
    }

    login(userName, password) {
        let httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http.post(this.baseUrl + "/auth/login", JSON.stringify({userName, password}), httpOptions)
            .pipe(
                map(res =>   {
                    localStorage.setItem('auth_token', res["auth_token"]);
                    this.loggedIn = true;
                    this._authNavStatusSource.next(true);
                    return true;
                }),
                catchError(this.handleError)
            );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    requestPasswordReset(email: string) {
        let httpOptions = {
            headers: new HttpHeaders(this.authorizationHeader)
        };
    
        let body = JSON.stringify({ email });
    
        return this.http.put(this.forgotPasswordUrl, body, httpOptions)
    }

    resetPassword (
        email: string,
        password: string,
        token: string
        ) {
        let httpOptions = {
            headers: new HttpHeaders(this.authorizationHeader)
        };
    
        let body = JSON.stringify({ email, password, token });
    
        return this.http.put(this.resetPasswordUrl, body, httpOptions)
    }
}