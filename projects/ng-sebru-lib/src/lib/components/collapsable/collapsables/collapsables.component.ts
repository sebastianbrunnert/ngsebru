import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  	selector: 'ngs-collapsables',
	templateUrl: './collapsables.component.html'
})
export class NgSCollapsablesComponent {

    @Input("ngSCollapsables")
    public ngSCollapsables: NgSCollapsables = new NgSCollapsables([])

    public openCollapsable(index: Number) {
        this.ngSCollapsables.currentOpen = index
        this.ngSCollapsables.onOpen(index)
    }

    public closeCollapsable(index: Number) {
        this.ngSCollapsables.currentOpen = -1
        this.ngSCollapsables.onClose(index)
    }

}

export class NgSCollapsables {
    constructor(
        public titles: String[] = [],
        public currentOpen: Number = -1
    ) {}

    public open(index: Number) {
        this.currentOpen = index
    }

    public onOpen(index: Number) {}

    public onClose(index: Number) {}
}