import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: "ngs-enter-leave",
    standalone: true,
    template: "<div [@enterLeave]=\"openCloseTrigger\" (@enterLeave.start)=\"this.finished = false\" (@enterLeave.done)=\"this.finished = true\"><ng-content *ngIf=\"this.active || !this.finished\"></ng-content></div>",
    imports: [CommonModule],
    animations: [
        trigger("enterLeave", [
            state(
                "enter",
                style({
                    opacity: 1,
                    transform: "scale(1, 1)"
                })
            ),
            state(
                "leave",
                style({
                    opacity: 0,
                    transform: "scale(0.95, 0.95)"
                })
            ),
            transition("enter => leave", [animate("100ms ease-in")]),
            transition("leave => enter", [animate("100ms ease-out")])
        ])
    ]
})
export class NgSEnterLeaveComponent {

    @Input("active")
    public active: Boolean = false;

    @Input("clickout")
    public clickout: Boolean = true;

    public finished: Boolean = false;

    @Output()
    public onClose: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    constructor(
        private eRef: ElementRef
    ) { }

    @HostListener("document:click", ["$event"])
    public detectClickout(event: any) {
        if (!this.clickout || !this.finished || !this.active) {
            return
        }

        var nativeElement = this.eRef.nativeElement;

        while (nativeElement && nativeElement.id != "clickout-target") {
            nativeElement = nativeElement.firstChild;
        }

        if (!nativeElement) {
            nativeElement = this.eRef.nativeElement;
        }

        if (event.target.id == "clickout-target" || event.target.tagName == "HTML") {
            this.active = false;
            this.onClose.emit(true);
        }
    }

    get openCloseTrigger(): String {
        return this.active ? "enter" : "leave";
    }
}