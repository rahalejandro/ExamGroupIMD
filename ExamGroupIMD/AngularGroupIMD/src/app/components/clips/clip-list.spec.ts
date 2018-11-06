import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClipListComponent } from './clip-list.component';
import { SharedModule } from '../../modules/shared.module';
import { IClip } from '../../entities/clip';
import { ClipService } from 'src/app/services/clip.service';

describe('Component: ClipListComponent', () => {
    
    let injector: TestBed;
    let service: ClipService;
    let component: ClipListComponent;
    let fixture: ComponentFixture<ClipListComponent>;
    let testClips: IClip[] = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClipListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
        });
        injector = getTestBed();
        service = injector.get(ClipService);
        spyOn(service, 'getClips').and.returnValue({ subscribe: () => {} });
        fixture = TestBed.createComponent(ClipListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        testClips = [
            { 
                ClipId: 1,
                Name: 'Bud Light',
                Description: 'A factory is working on the new Bud Light Platinum.',
                Standard: 'PAL',
                Definition: 'SD',
                StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
                EndTime: { Hours: 0, Minutes: 0, Seconds: 30, Frames: 12}
            },
            { 
                ClipId: 3,
                ClipName: 'Audi',
                ClipDescription: 'A group of vampires are having a party in the woods. The vampire in charge of drinks (blood types) arrives in his Audi. The bright lights of the car kills all of the vampires, with him wondering where everyone went afterwards.',
                ClipStandard: 'PAL',
                ClipDefinition: 'SD',
                StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
                EndTime: { Hours: 0, Minutes: 1, Seconds: 30, Frames: 0}
            }
        ] as IClip[];
    });

    it('should have a defined Clip List Component', () => {
        component.ngOnInit();
        expect(component).toBeDefined();
    });

    it('should display a list of Clips', () => {
        component.ngOnInit();
        expect(testClips.length).toBe(2);
    });

    it('should call getClips function', function () {
        service.getClips();
        expect(service.getClips).toHaveBeenCalled();
    });
});