import { Pipe, PipeTransform } from "@angular/core";
import { SecondsToDurationTranformer } from "../services/data.service";

@Pipe({
    name: "duration",
    pure: false,
    standalone: true
})
export class NgSSecondsToDurationPipe implements PipeTransform {
    constructor() { }

    transform(key: Number): any {
        return new SecondsToDurationTranformer(key).result()
    }
}