import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class ConfigService {

    _apiURI : string;

    constructor() {
        this._apiURI = 'http://localhost:62090/api';
    }

    getApiURI() {
        return this._apiURI;
    }
}