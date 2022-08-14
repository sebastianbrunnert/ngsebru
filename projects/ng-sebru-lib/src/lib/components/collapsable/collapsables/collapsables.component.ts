import { Component, Input } from '@angular/core';
import { NgSCollapsable } from '../collapsable.component';

@Component({
  	selector: 'ngs-collapsables',
	templateUrl: './collapsables.component.html'
})
export class NgSCollapsablesComponent {

    @Input("ngSCollapsables")
    public ngSCollapsables: NgSCollapsables = new NgSCollapsables([])

}

export class NgSCollapsables {

    public elements: NgSCollapsable[] = []
    public currentOpen: Number = -1

    constructor(
        public titles: String[] = [],
    ) {
        titles.forEach((title) => {
            const element = new NgSCollapsable(title)
            element.onOpen = () => {
                const index = this.elements.indexOf(element)
                if(this.currentOpen != -1) {
                    this.elements[this.currentOpen as number].change()
                }
                this.currentOpen = index
                this.onOpen(index)
            }
            element.onClose = () => {
                const index = this.elements.indexOf(element)
                this.currentOpen = -1
                this.onClose(index)
            }
            this.elements.push(element)
        });
    }

    public onOpen(index: Number) {}

    public onClose(index: Number) {}
}