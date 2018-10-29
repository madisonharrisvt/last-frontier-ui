import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI : string;

    constructor() {
        //this._apiURI = 'https://api.lastfrontierlarp.com/api';
        this._apiURI = 'http://localhost:62090/api';
    }

    getApiURI() {
        return this._apiURI;
    }
}