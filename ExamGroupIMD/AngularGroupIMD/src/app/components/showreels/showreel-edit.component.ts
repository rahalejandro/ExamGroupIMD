import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IShowReel } from '../../entities/showreel';
import { IClip } from '../../entities/clip';
import { ShowReelService } from '../../services/showreel.service';
import { AppConstants } from '../../app.constants';

@Component({
    templateUrl: './showreel-edit.component.html'
})

export class ShowReelEditComponent implements OnInit, OnDestroy {
    pageTitle = AppConstants.addTitle;
    errorMessage: string;
    standardList = [];
    definitionList = [];
    showReelNameMessage: string;
    showReelDuration: IClip[];
    Standard: string;
    Definition: string;
    EditClips: IClip[];
    sub: Subscription;
    ChangeList: boolean = false;
    isEdit: boolean = false;

    showReelForm: FormGroup;
    showReel: IShowReel;
    showReelClips: IClip[];

    private validationShowReelMessages = AppConstants.validationShowReelMessages;
    private dataStandard = AppConstants.dataStandard;
    private dataDefinition = AppConstants.dataDefinition;

    constructor(private fb: FormBuilder, 
        private showreelService: ShowReelService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        this.Initialize();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    Initialize(): void {
        this.showReelForm = this.createForm();

        this.standardList = this.dataStandard;

        this.validateShowReelName();

        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getShowReel(id);
                if(id === 0) {
                    this.EditClips = null;
                }
            }
        );
    }

    createForm(): FormGroup {
        return this.fb.group({
            Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            Standard: ['', [Validators.required]],
            Definition: ['', [Validators.required]],
            Duration: [{value: '', disabled: true}],
            Clips: []
        });
    }

    validateShowReelName(): void {
        const showReelNameControl = this.showReelForm.get('Name');
            showReelNameControl.valueChanges.pipe(debounceTime(800))
                .subscribe(value => this.showReelNameMessage = this.setMessage(showReelNameControl, 'Name'));
    }

    setMessage(c: AbstractControl, cId: string): string {
        let msg = '';
        if((c.touched || c.dirty && !c.valid) && c.errors !== null) {
            if(cId === 'Name') {
                msg = Object.keys(c.errors).map(key =>
                        this.validationShowReelMessages[key]).join(' ');
            }            
        }
        return msg
    }
    
    validateFields() {
        if(!this.isEdit) {
            if(!this.showReelForm.valid || !this.showReelForm.dirty) {
                return true;
            }
        }
        else {
            if((!this.showReelForm.valid || !this.showReelForm.dirty) && !this.ChangeList) {
                return true;
            }
            else if((!this.showReelForm.valid && this.showReelForm.dirty) && this.ChangeList) {
                return true;
            }
        }
    }

    changeStandard(event: any): void {
        if(event.target.value !== "") {
            
            this.Standard = event.target.value;
            this.definitionList = this.dataDefinition;
            this.resetCommonValues();
        }
        else {
            this.Standard = "";
            this.Definition = "";
            this.definitionList = [];
            this.showReelForm.get('Definition').setValue("");
            this.resetCommonValues();
        }
    }
    changeDefinition(event: any): void {
        if(event.target.value !== "") {
            this.Definition = event.target.value;
            this.resetCommonValues();
        }
        else {
            this.Definition = "";
            this.resetCommonValues();
        }
    }

    resetCommonValues(): void {
        this.showReelClips = null;
        this.EditClips = null;
        this.showReelDuration = null;
        this.ChangeList = false;
    }

    clipAdded(obj: object) {
        this.showReelClips = obj["clips"];
        this.showReelDuration = obj["clips"];
        this.ChangeList = obj["changelist"];
    }

    getShowReel(id: number): void {
        if(id !== 0) {
            this.showreelService.getShowReel(id)
                .subscribe(
                    (showreel: IShowReel) => this.displayShowReel(showreel),
                    (error: any) => this.errorMessage = <any>error
            );

            if(this.errorMessage !== undefined && this.errorMessage !== "") {
                this.reset();
                this.router.navigate([AppConstants.urlDefaultEdit]);
            }
            this.isEdit = true;
        }
        else {
            this.reset();
            this.showReel = null;
            this.pageTitle = AppConstants.addTitle;
            this.Standard = "";
            this.Definition = "";
            this.definitionList = [];
            this.showReelForm.get('Standard').setValue("");
            this.showReelForm.get('Definition').setValue("");
            this.isEdit = false;
            this.resetCommonValues();
        }
    }

    displayShowReel(showreel: IShowReel): void {
        if (this.showReelForm) {
            this.reset();
        }
        this.showReel = showreel;
    
        if (this.showReel.ReelId === 0) {
            this.pageTitle = AppConstants.addTitle;
        } 
        else {
            this.pageTitle = AppConstants.editTitle + `: ${this.showReel.Name}`;
            this.definitionList = this.dataDefinition;
        }
    
        // Update the data on the form
        this.showReelForm.patchValue({
            Name: this.showReel.Name,
            Standard: this.showReel.Standard,
            Definition: this.showReel.Definition,
            Duration: this.showReel.Clips
        });

        this.Standard = this.showReel.Standard;
        this.Definition = this.showReel.Definition;
        this.EditClips = this.showReel.Clips;
        this.showReelDuration = this.showReel.Clips;
        this.ChangeList = false;

    }

    saveShowReel(): void {
        if (this.showReelForm.valid || this.showReelForm.dirty || this.ChangeList) {
            //retain the values not present in the form
            const objShowReel = { ...this.showReel, ...this.showReelForm.value };
            if(this.showReelClips !== undefined || this.showReel === undefined) {
                objShowReel.Clips = this.showReelClips;
            }
            else {
                objShowReel.Clips = this.showReel.Clips;
            }
            if (objShowReel.ReelId === undefined) {
                if(objShowReel.Clips && objShowReel.Clips.length > 0) {
                    this.showreelService.saveShowReel(objShowReel)
                        .subscribe(
                            () => this.onSaveComplete(),
                            (error: any) => this.errorMessage = <any>error
                    );
                }
                else {
                    alert(AppConstants.requiresClipMessage);
                }
            }
            else {
                if(objShowReel.Clips && objShowReel.Clips.length > 0) {
                    if(confirm(AppConstants.confirmUpdateMessage)) {
                        this.showreelService.updateShowReel(objShowReel)
                            .subscribe(
                                () => this.onSaveComplete(),
                                (error: any) => this.errorMessage = <any>error
                        );
                    }
                }
                else {
                    alert(AppConstants.requiresClipMessage);
                }
            }
        }
    }

    deleteShowReel(): void {
        //retain the values not present in the form
        const objShowReel = { ...this.showReel, ...this.showReelForm.value };
        if(objShowReel.ReelId !== undefined) {
            if(confirm(AppConstants.confirmDeleteMessage)){
                this.showreelService.deleteShowReel(objShowReel.ReelId)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                );
            }
        }
    }

    reset(): void {
        this.showReelForm.reset();
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.reset();
        this.router.navigate([AppConstants.urlDefault]);
    }
}