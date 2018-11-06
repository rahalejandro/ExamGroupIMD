import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IClip } from '../../entities/clip';
import { ClipService } from '../../services/clip.service';

@Component({
    selector: 'video-clips',
    templateUrl: './clip-list.component.html'
})

export class ClipListComponent implements OnInit {
    errorMessage = '';
    @Input() standard: string;
    @Input() definition: string;
    @Input() editClips: IClip[];
    @Input() changelist: boolean;
    @Output() reelClips = new EventEmitter<object>();

    filteredClips: IClip[] = [];
    clips: IClip[] = [];
    clips2: IClip[] = [];

    constructor(private clipService: ClipService) {}

    ngOnChanges(): void {
        if(this.standard && this.definition && !this.changelist) {
            this.filteredClips = this.clips.filter(r => r.Standard == this.standard && r.Definition == this.definition);
            this.clips.forEach((r) => {
                r.isChecked = false;
            });
        }
        else if(!this.changelist) {
            this.filteredClips = null;
            this.clips.forEach((r) => {
                r.isChecked = false;
            });
        }
    }

    checkDefinition(definition1: string, definition2: string): boolean {
        if(definition1 === "SD" && definition2 === "HD") {
            return true;
        }
        else if(definition1 === "HD" && definition2 === "SD") {
           return true;
        }
        else {
            return false;
        }
    }

    addClip(event: any): void {
        if(event.target.checked) {
            let clip = this.clips.filter(r => r.ClipId == event.target.value);;
            if(this.editClips && this.editClips.length > 0) {                
                this.reelClips.emit(this.pushClip(this.editClips, clip[0]));                
            }
            else {
                this.reelClips.emit(this.pushClip(this.clips2, clip[0]));
            }
        }
        else {
            if(this.editClips && this.editClips.length > 0) {
                this.reelClips.emit(this.spliceClip(event.target.value, this.editClips));
            }
            else {
                this.reelClips.emit(this.spliceClip(event.target.value, this.clips2));
            }            
        }
    }

    pushClip(varClips: IClip[], varClip: IClip): object {
        let obj;
        varClips.push(varClip);
        this.changelist = true;
        console.log(varClips);
        obj = {"clips": varClips, "changelist": this.changelist};
        return obj;
    }

    spliceClip(clipId: number, varClips: IClip[]): object {
        let obj;
        let index = varClips.findIndex(r => r.ClipId == clipId);
        varClips.splice(index, 1);
        this.changelist = true;
        console.log(varClips);
        obj = {"clips": varClips, "changelist": this.changelist};
        return obj;
    }

    loadClips(): void {
        this.clipService.getClips().subscribe(
            clips => {
                this.clips = clips;
                if(this.standard && this.definition) {
                    this.filteredClips = this.clips.filter(r => r.Standard == this.standard && r.Definition == this.definition);
                    if(this.editClips && this.editClips.length > 0) {
                        this.clips.forEach((r) => {
                            this.editClips.forEach((r2) => {
                                if(r.ClipId === r2.ClipId) {
                                    r.isChecked = true;
                                }
                            });
                        });
                    }
                }
            },
            error => this.errorMessage = <any>error
        );
    }

    ngOnInit(): void {
        this.loadClips();
    }
}