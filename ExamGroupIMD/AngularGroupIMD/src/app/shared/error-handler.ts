import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandler {
    static handleError(err: HttpErrorResponse) {
        // logs error to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // client side error
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // backend error
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError('An error occurred. Please try again.');
    }
}