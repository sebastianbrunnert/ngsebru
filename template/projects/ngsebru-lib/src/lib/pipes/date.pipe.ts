import { Pipe, PipeTransform } from "@angular/core";
import { DayTagToFormattedDayTransformer, DayTagToFormattedTimeTransformer } from "../services/data.service";

@Pipe({
    name: "date",
    pure: false,
    standalone: true
})
export class NgSDateTagToFormattedDatePipe implements PipeTransform {
    constructor() { }

    transform(key: String): any {
        return new DayTagToFormattedDayTransformer(key).result() + " - " + new DayTagToFormattedTimeTransformer(key).result()
    }
}

@Pipe({
    name: "justdate",
    pure: false,
    standalone: true
})
export class NgSJustDateTagToFormattedDatePipe implements PipeTransform {
    constructor() { }

    transform(key: String): any {
        return new DayTagToFormattedDayTransformer(key).result()
    }
}