import { Component, Input } from "@angular/core";

@Component({
    templateUrl: "./spinner.component.html",
    selector: "ngs-spinner",
    standalone: true
})
export class NgSSpinnerComponent {

    @Input("size")
    public size: number = 6

    @Input("color")
    public color: String = "blue-500"

}
