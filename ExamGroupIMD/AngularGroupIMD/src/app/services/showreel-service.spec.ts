import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IShowReel } from '../entities/showreel';
import { ShowReelService } from './showreel.service';
import { AppConstants } from '../app.constants';

describe('ShowReel Service Tests', () => {
    
    let injector: TestBed;
    let service: ShowReelService;
    let httpMock: HttpTestingController;
    let req;
    let url = AppConstants.urlReel;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ShowReelService]
        });
        injector = getTestBed();
        service = injector.get(ShowReelService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    const testShowReel = [
        { 
            ReelId: 1, 
            lName: 'Beer', 
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

    describe('getShowReels()', () => {
        it('should return a list of ShowReels', () => {
            service.getShowReels().subscribe((showReels) => {
                expect(showReels.length).toBeGreaterThan(0);
            });
            req = httpMock.expectOne(url + 'GetAllReels');
            expect(req.request.method).toBe("GET");
            httpMock.verify();
        });
    });

    describe('getShowReel()', () => {
        it('should return ShowReel with ID 1', () => {
            service.getShowReel(1).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(1);
            });
            req = httpMock.expectOne(url + 'GetReelById/1');
            expect(req.request.method).toBe("GET");
            httpMock.verify();
        });

        it('should return ShowReel ID 2', () => {
            service.getShowReel(2).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(2);
            });
            req = httpMock.expectOne(url + 'GetReelById/2');
            expect(req.request.method).toBe("GET");
            httpMock.verify();
        });
    });

    describe('updateShowReel() should update current ShowReel', () => {
        it('should update ShowReel ID 1', () => {
            service.updateShowReel(testShowReel[0]).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(1);
            });
            req = httpMock.expectOne(url + 'UpdateReel/1');
            expect(req.request.method).toBe("PUT");
            httpMock.verify();
        });

        it('should update ShowReel ID 2', () => {
            service.updateShowReel(testShowReel[1]).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(2);
            });
            req = httpMock.expectOne(url + 'UpdateReel/2');
            expect(req.request.method).toBe("PUT");
            httpMock.verify();
        });
    });

    describe('saveShowReel() should update current ShowReel', () => {
        it('should save ShowReel ID 1', () => {
            service.saveShowReel(testShowReel[1]).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(1);
            });
            req = httpMock.expectOne(url + 'SaveReel');
            expect(req.request.method).toBe("POST");
            httpMock.verify();
        });

        it('should save ShowReel ID 2', () => {
            service.saveShowReel(testShowReel[1]).subscribe((showReel) => {
                expect(showReel.ReelId).toBe(2);
            });
            req = httpMock.expectOne(url + 'SaveReel');
            expect(req.request.method).toBe("POST");
            httpMock.verify();
        });
    });

    describe('deleteShowReel() should delete current ShowReel', () => {
        it('should delete ShowReel ID 1', () => {
            service.deleteShowReel(1).subscribe((data: any) => {
                expect(data).toBe(1);
            });
            req = httpMock.expectOne(url + 'DeleteReelById/1');
            expect(req.request.method).toBe("DELETE");
            req.flush(1);
            httpMock.verify();
        });

        it('should delete ShowReel ID 2', () => {
            service.deleteShowReel(2).subscribe((data: any) => {
                expect(data).toBe(2);
            });
            req = httpMock.expectOne(url + 'DeleteReelById/2');
            expect(req.request.method).toBe("DELETE");
            req.flush(2);
            httpMock.verify();
        });
    });
});
