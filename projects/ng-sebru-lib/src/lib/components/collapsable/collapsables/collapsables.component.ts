import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  	selector: 'ngs-collapsables',
	templateUrl: './collapsables.component.html'
})
export class NgSCollapsablesComponent {

    @Input("ngSCollapsables")
    public ngSCollapsables: NgSCollapsables = new NgSCollapsables([])

    @Output()
    public open: EventEmitter<NgSCollapsableEvent> = new EventEmitter<NgSCollapsableEvent>()

    @Output()
    public close: EventEmitter<NgSCollapsableEvent> = new EventEmitter<NgSCollapsableEvent>()

    public openCollapsable(title: String, index: Number) {
        this.ngSCollapsables.currentOpen = index
        this.open.emit({title: title, index: index})
    }

    public closeCollapsable(title: String, index: Number) {
        this.ngSCollapsables.currentOpen = -1
        this.close.emit({title: title, index: index})
    }

}

export class NgSCollapsableEvent {
    public title: String = ""
    public index: Number = -1
}

export class NgSCollapsables {
    constructor(
        public titles: String[] = [],
        public currentOpen: Number = -1
    ) {}

    public open(index: Number) {
        this.currentOpen = index
    }
}