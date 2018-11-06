import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowReelListComponent } from './showreel-list.component';
import { SharedModule } from '../../modules/shared.module';

import { IShowReel } from '../../entities/showreel';
import { ShowReelService } from '../../services/showreel.service';

describe('Component: ShowReelListComponent', () => {
    
    let injector: TestBed;
    let service: ShowReelService;
    let component: ShowReelListComponent;
    let fixture: ComponentFixture<ShowReelListComponent>;
    let spy;
    let testShowReel: IShowReel[] = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ShowReelListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule]
        });
        injector = getTestBed();
        service = injector.get(ShowReelService);
        spyOn(service, 'getShowReels').and.returnValue({ subscribe: () => {} });
        fixture = TestBed.createComponent(ShowReelListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        testShowReel = [
            { 
                ReelId: 1, 
                Name: 'Beer', 
                Standard: 'PAL', 
                Definition: 'SD',
                Clips: [
                    {
                        ClipId: 1,
                        Name: 'Bud Light',
                        Description: 'A factory is working on the new Bud Light Platinum.',
                        Standard: 'PAL',
                        Definition: 'SD',
                        StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
                        EndTime: { Hours: 0, Minutes: 0, Seconds: 30, Frames: 12}

                    }
                ]
            },
            { 
                ReelId: 2, 
                Name: 'Beer Car', 
                Standard: 'PAL', 
                Definition: 'SD', 
                Clips: [
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
                        Name: 'Audi',
                        Description: 'A group of vampires are having a party in the woods. The vampire in charge of drinks (blood types) arrives in his Audi. The bright lights of the car kills all of the vampires, with him wondering where everyone went afterwards.',
                        Standard: 'PAL',
                        Definition: 'SD',
                        StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
                        EndTime: { Hours: 0, Minutes: 1, Seconds: 30, Frames: 0}
                    }
                ]
            }
        ] as IShowReel[];
    });

    it('should have a defined ShowReel List Component', () => {
        expect(component).toBeDefined();
    });

    it('should call getShowReels function', function () {
        service.getShowReels();
        expect(service.getShowReels).toHaveBeenCalled();
    });

    it('should display a list of ShowReel', () => {
        component.ngOnInit();
        expect(testShowReel.length).toBe(2);
    });
});