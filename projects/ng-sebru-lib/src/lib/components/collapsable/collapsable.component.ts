import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  	selector: 'ngs-collapsable',
	templateUrl: './collapsable.component.html'
})
export class NgSCollapsableComponent {
	
    @Input("title")
    public title: String = ""

    @Input("open")
    public state: Boolean = false

    @Output()
    public open: EventEmitter<void> = new EventEmitter<void>()

    public changeState() {
        this.state = !this.state
        if(this.state) {
            this.open.emit()
        }
    }

}