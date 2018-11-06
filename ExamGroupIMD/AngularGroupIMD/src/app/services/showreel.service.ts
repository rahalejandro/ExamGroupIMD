import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IShowReel } from '../entities/showreel';
import { ErrorHandler } from '../shared/error-handler';
import { AppConstants } from '../app.constants';

@Injectable({
    providedIn: 'root'
})

export class ShowReelService {
    readonly urlAPI = AppConstants.urlReel;

    constructor(private http: HttpClient) { }

    getShowReels(): Observable<IShowReel[]> {
        let url = this.urlAPI + 'GetAllReels'
        return this.http.get<IShowReel[]>(url).pipe(
          tap(data => console.log('getShowReels: ' + JSON.stringify(data))),
          catchError(ErrorHandler.handleError)
        );
    }

    getShowReel(id: number): Observable<IShowReel> {
        let url = this.urlAPI + 'GetReelById/' + id;
        return this.http.get<IShowReel>(url).pipe(
          tap(data => console.log('getShowReel: ' + JSON.stringify(data))),
          catchError(ErrorHandler.handleError)
        );
    }

    updateShowReel(showReel: IShowReel): Observable<IShowReel> {
        let url = this.urlAPI + 'UpdateReel/' + showReel.ReelId
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<IShowReel>(url, showReel, { headers: headers })
            .pipe(
                tap(() => console.log('updateShowReel: ' + showReel.ReelId)),
                map(() => showReel),
                catchError(ErrorHandler.handleError)
        );
    }

    saveShowReel(showReel: IShowReel): Observable<IShowReel> {
        let url = this.urlAPI + 'SaveReel'
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<IShowReel>(url, showReel, { headers: headers })
            .pipe(
                tap(data => console.log('createShowReel: ' + JSON.stringify(data))),
                catchError(ErrorHandler.handleError)
        );
    }

    deleteShowReel(id: number): Observable<IShowReel> {
        let url = this.urlAPI + 'DeleteReelById/' + id
        return this.http.delete<IShowReel>(url).pipe(
            tap(data => console.log('deleteReelById: ' + JSON.stringify(data))),
            catchError(ErrorHandler.handleError)
        );
    }
}
