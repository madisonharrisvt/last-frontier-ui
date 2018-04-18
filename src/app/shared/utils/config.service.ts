import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI : string;

    constructor() {
        this._apiURI = 'http://ec2-54-153-125-138.us-west-1.compute.amazonaws.com/api';
    }

    getApiURI() {
        return this._apiURI;
    }
}