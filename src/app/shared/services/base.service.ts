
import {throwError as observableThrowError,  Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseService {
    
    constructor() { }

    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          return throwError(`An error occurred: ${error.error.message}`);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          var errorString = '';

          if(error.status == 400) {
            var errors = error.error;
            var errorKeys = Object.keys(errors);
            errorKeys.forEach(key => {
              errorString = errorString + ' ' + errors[key];
          });
          } else {
              errorString = `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`;
          }
          
          return throwError(errorString);
        }
      };
}