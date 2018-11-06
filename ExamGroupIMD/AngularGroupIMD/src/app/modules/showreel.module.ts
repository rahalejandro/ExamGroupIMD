import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ShowReelListComponent } from '../components/showreels/showreel-list.component';
import { ShowReelEditComponent } from '../components/showreels/showreel-edit.component';
import { ClipListComponent } from '../components/clips/clip-list.component';
import { SharedModule } from './shared.module';
import { ShowReelEditGuard } from '../guards/showreel-edit.guard';

@NgModule({
    imports: [
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'showreels', component: ShowReelListComponent },
            { path: 'showreels/:id/edit', canDeactivate: [ShowReelEditGuard], component: ShowReelEditComponent },
        ]),
        SharedModule
    ],
    declarations: [
        ShowReelListComponent,
        ShowReelEditComponent,
        ClipListComponent
    ]
})

export class ShowReelModule {
    
}