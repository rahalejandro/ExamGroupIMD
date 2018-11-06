import { Component, OnInit } from '@angular/core';

import { IShowReel } from '../../entities/showreel';
import { ShowReelService } from '../../services/showreel.service';
import { AppConstants } from '../../app.constants';

@Component({
    templateUrl: './showreel-list.component.html'
})

export class ShowReelListComponent implements OnInit {
    pageTitle = AppConstants.listTitle;
    errorMessage = '';

    _listFilter;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredShowReels = this.listFilter ? this.performFilter(this.listFilter) : this.showreels;
    }

    filteredShowReels: IShowReel[] = [];
    showreels: IShowReel[] = [];

    constructor(private showreelService: ShowReelService) { }

    performFilter(filterBy: string): IShowReel[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.showreels.filter((showreel: IShowReel) =>
        showreel.Name.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    ngOnInit(): void {
        this.showreelService.getShowReels().subscribe(
            showreels => {
              this.showreels = showreels;
              this.filteredShowReels = this.showreels;
            },
            error => this.errorMessage = <any>error
        );
    }
}