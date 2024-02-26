import { Component, Input } from "@angular/core";

@Component({
    templateUrl: "./waiting.component.html",
    selector: "ngs-waiting",
    standalone: true
})
export class NgSWaitingComponent {

    @Input("size")
    public size: number = 6

    @Input("color")
    public color: String = "blue-500"

}
