import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: "ngs-enter-leave",
    standalone: true,
    template: "<div class='z-50' [@enterLeave]=\"openCloseTrigger\" (@enterLeave.start)=\"this.finished = false\" (@enterLeave.done)=\"this.finished = true\"><ng-content *ngIf=\"this.active || !this.finished\"></ng-content></div>",
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

    @Input("clickoutTarget")
    public clickoutTarget: String = "clickout-target";

    public finished: Boolean = false;

    @Output()
    public onClose: EventEmitter<Boolean> = new EventEmitter<Boolean>();

    constructor(
        private cdr: ChangeDetectorRef
    ) { }

    @HostListener("document:click", ["$event"])
    public detectClickout(event: any) {
        if (!this.clickout || !this.finished || !this.active) {
            return
        }

        if (this.isTextSelected()) {
            return;
        }

        let parent = event.target;
        while (parent) {
            if (parent.id == this.clickoutTarget) {
                return;
            }
            parent = parent.parentElement;
        }

        this.active = false;
        this.cdr.detectChanges();
        this.onClose.emit(true);
    }

    private isTextSelected() {
        var selection = window.getSelection();
        return selection && selection.type === 'Range';
    }

    get openCloseTrigger(): String {
        return this.active ? "enter" : "leave";
    }
}
