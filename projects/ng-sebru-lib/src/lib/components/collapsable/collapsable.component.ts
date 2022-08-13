import { Component, Input } from '@angular/core';

@Component({
  	selector: 'ngs-collapsable',
	templateUrl: './collapsable.component.html'
})
export class NgSCollapsableComponent {
	
    @Input("ngSCollapsable")
    public ngSCollapsable: NgSCollapsable = new NgSCollapsable()

    public change() {
        this.ngSCollapsable.change()
    }
}

export class NgSCollapsable {

    public state: Boolean = false

    constructor(
        public title: String = ""
    ) {}

    public change() {
        if(this.state) {
            this.onClose()
        } else {
            this.onOpen()
        }
        setTimeout(() => {
            this.state = !this.state
        })
    }

    public onOpen() {}

    public onClose() {}
}