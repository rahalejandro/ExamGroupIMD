import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IClip } from '../entities/clip';
import { ErrorHandler } from '../shared/error-handler';
import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})

export class ClipService {
    readonly urlAPI = AppConstants.urlClip;

    constructor(private http: HttpClient) { 

    }

    getClips(): Observable<IClip[]> {
        let url = this.urlAPI + 'GetAllClips';
        return this.http.get<IClip[]>(url).pipe(
          tap(data => console.log('getAllClips: ' + JSON.stringify(data))),
          catchError(ErrorHandler.handleError)
        );
    }
}

