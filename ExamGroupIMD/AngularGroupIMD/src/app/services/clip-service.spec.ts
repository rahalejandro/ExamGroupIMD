import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClipService } from './clip.service';
import { AppConstants } from '../app.constants';

describe('ShowReel Service Tests', () => {
    
    let injector: TestBed;
    let service: ClipService;
    let httpMock: HttpTestingController;
    let req;
    let url = AppConstants.urlClip;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ClipService]
        });
        injector = getTestBed();
        service = injector.get(ClipService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('getClips()', () => {
        it('should return a list of Clips', () => {
            service.getClips().subscribe((clips) => {
                expect(clips.length).toBeGreaterThan(0);
            });
            req = httpMock.expectOne(url + 'GetAllClips');
            expect(req.request.method).toBe("GET");
        });
    });
});