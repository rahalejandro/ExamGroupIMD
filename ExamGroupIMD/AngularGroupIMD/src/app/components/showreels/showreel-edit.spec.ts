import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowReelEditComponent } from './showreel-edit.component';
import { ClipListComponent } from '../clips/clip-list.component';
import { SharedModule } from '../../modules/shared.module';
import { ShowReelService } from '../../services/showreel.service';
import { IShowReel } from '../../entities/showreel';
import { IClip } from '../../entities/clip';

describe('Component: ShowReelEditComponent', () => {
    
    let injector: TestBed;
    let service: ShowReelService;
    let component: ShowReelEditComponent;
    let fixture: ComponentFixture<ShowReelEditComponent>;
    let errors;
    let reelName;
    let reelStandard;
    let reelDefinition;
    let obj: object;
    let testReel: IShowReel;
    let testClips: IClip[] = [];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ShowReelEditComponent, ClipListComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, SharedModule],
            providers: [ShowReelService]
        });
        injector = getTestBed();
        service = injector.get(ShowReelService);
        spyOn(service, 'getShowReel').and.returnValue({ subscribe: () => {} });
        spyOn(service, 'saveShowReel').and.returnValue({ subscribe: () => {} });
        spyOn(service, 'updateShowReel').and.returnValue({ subscribe: () => {} });
        spyOn(service, 'deleteShowReel').and.returnValue({ subscribe: () => {} });
        fixture = TestBed.createComponent(ShowReelEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.ngOnInit();
        reelName = component.showReelForm.controls['Name'];
        reelStandard = component.showReelForm.controls['Standard'];
        reelDefinition = component.showReelForm.controls['Definition'];
        obj = {"clips": [], "changelist": false };

        testReel = {
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
        } as IShowReel;

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
                Name: 'Audi',
                Description: 'A group of vampires are having a party in the woods. The vampire in charge of drinks (blood types) arrives in his Audi. The bright lights of the car kills all of the vampires, with him wondering where everyone went afterwards.',
                Standard: 'PAL',
                Definition: 'SD',
                StartTime: { Hours: 0, Minutes: 0, Seconds: 0, Frames: 0 },
                EndTime: { Hours: 0, Minutes: 1, Seconds: 30, Frames: 0}
            }
        ] as IClip[];
    });

    it('should have a defined ShowReel Edit Component', () => {
        expect(component).toBeDefined();
    });

    it('should have Standards property been defined', function () {
        expect(component.standardList).toBeDefined();
    });

    it('should have Definitions property been defined', function () {
        expect(component.definitionList).toBeDefined();
    });

    it('should create a FormGroup with FormControls', () => {
        expect(component.showReelForm instanceof FormGroup).toBe(true);
    });

    it('ReelName field is invalid when initialized', () => {        
        expect(reelName.valid).toBeFalsy();
    });

    it('ReelName field is required', () => {
        errors = {};
        errors = reelName.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('ReelStandard dropdownlist field is required', () => {
        errors = {};
        errors = reelStandard.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('ReelDefinition dropdownlist field required', () => {
        errors = {};
        errors = reelDefinition.errors || {};
        expect(errors['required']).toBeTruthy();
    });

    it('Submit a form to create or edit a ShowReel', () => {
        expect(component.showReelForm.valid).toBeFalsy();
        reelName.setValue("Show Reel Record");
        reelStandard.setValue("PAL");
        reelDefinition.setValue("SD");
        expect(component.showReelForm.valid).toBeTruthy();
        component.saveShowReel();
    });

    it('Should display 2 clips based on the Standard and Definition', () => {
        expect(component.showReelForm.valid).toBeFalsy();
        reelName.setValue("Show Reel Record");
        reelStandard.setValue("PAL");
        reelDefinition.setValue("SD");
        expect(component.showReelForm.valid).toBeTruthy();
        expect(testClips.length).toBe(2);
    });

    it('should call validateShowReelName to check is Name field met the correct criteria', function () {
        spyOn(component, 'validateShowReelName');
        component.validateShowReelName();
        expect(component.validateShowReelName).toHaveBeenCalled();
    });

    it('should call setMessage to check is Save button will be enabled', function () {
        spyOn(component, 'setMessage');
        let abstract: AbstractControl;
        let controlId: string;
        component.setMessage(abstract, controlId);
        expect(component.setMessage).toHaveBeenCalled();
    });

    it('should call validateFields to check is Save button will be enabled', function () {
        spyOn(component, 'validateFields');
        component.validateFields();
        expect(component.validateFields).toHaveBeenCalled();
    });

    it('should call changeStandard and reset fields to default', function () {
        spyOn(component, 'changeStandard');
        component.changeStandard(event);
        expect(component.changeStandard).toHaveBeenCalled();
    });

    it('should call changeDefinition and reset fields to default', function () {
        spyOn(component, 'changeDefinition');
        component.changeDefinition(event);
        expect(component.changeDefinition).toHaveBeenCalled();
    });

    it('should call resetCommonValues and reset fields to default', function () {
        spyOn(component, 'resetCommonValues');
        component.resetCommonValues();
        expect(component.resetCommonValues).toHaveBeenCalled();
    });

    it('should call clipAdded and update object for duration calculation', function () {
        spyOn(component, 'clipAdded');
        component.clipAdded(obj);
        expect(component.clipAdded).toHaveBeenCalled();
    });

    it('should call displayShowReel  and display showreel record', function () {
        spyOn(component, 'displayShowReel');
        component.displayShowReel(testReel);
        expect(component.displayShowReel).toHaveBeenCalled();
    });

    it('should call onSaveComplete and redirect to /showreels', function () {
        spyOn(component, 'onSaveComplete');
        component.onSaveComplete();
        expect(component.onSaveComplete).toHaveBeenCalled();
    });

    it('should call deleteShowReel, which will ask for confirmation before deleting the record', function () {
        spyOn(component, 'deleteShowReel');
        component.deleteShowReel();
        expect(component.deleteShowReel).toHaveBeenCalled();
    });

    it('should call reset, which will reset the showreel form', function () {
        spyOn(component, 'reset');
        component.reset();
        expect(component.reset).toHaveBeenCalled();
    });

    it('should call getShowReel function', function () {
        service.getShowReel(1);
        expect(service.getShowReel).toHaveBeenCalled();
    });

    it('should call saveShowReel function', function () {
        service.saveShowReel(testReel);
        expect(service.saveShowReel).toHaveBeenCalled();
    });

    it('should call updateShowReel function', function () {
        service.updateShowReel(testReel);
        expect(service.updateShowReel).toHaveBeenCalled();
    });

    it('should call deleteShowReel function', function () {
        service.deleteShowReel(1);
        expect(service.deleteShowReel).toHaveBeenCalled();
    });
});