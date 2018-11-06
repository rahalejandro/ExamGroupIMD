import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClipListComponent } from '../../app/components/clips/clip-list.component';
import { SharedModule } from '../../app/modules/shared.module';
import { ShowReelService } from '../../app/services/showreel.service';
import { ShowReelEditComponent } from '../../app/components/showreels/showreel-edit.component';
import { ShowReelEditGuard } from './showreel-edit.guard'


describe('ShowReel Edit Guard', () => {

    let component: ShowReelEditComponent;
    let fixture: ComponentFixture<ShowReelEditComponent>;
    let service: ShowReelEditGuard;
  
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ShowReelEditComponent, ClipListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, SharedModule],
            providers: [
                ShowReelEditGuard,
                ShowReelService
            ]
        }).compileComponents();

        service = TestBed.get(ShowReelEditGuard);
        fixture = TestBed.createComponent(ShowReelEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
    });

    it('expect ShowReelEditGuard to instantiate', () => {
      expect(service).toBeTruthy();
    });

    it('can route to /showreels when the form is not dirty or unguarded', () => {
        expect(service.canDeactivate(component)).toBeTruthy();
    });
});
