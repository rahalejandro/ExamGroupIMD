import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { ShowReelEditComponent } from '../components/showreels/showreel-edit.component';

@Injectable({
    providedIn: 'root'
})

export class ShowReelEditGuard implements CanDeactivate<ShowReelEditComponent> {
    canDeactivate(component: ShowReelEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.showReelForm.dirty) {
            return confirm(`Are you sure you want to navigate away and lose all your changes?`);
        }
        return true;
    }
}