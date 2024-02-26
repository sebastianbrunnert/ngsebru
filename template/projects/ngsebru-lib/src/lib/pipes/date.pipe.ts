import { Pipe, PipeTransform } from "@angular/core";
import { DayTagToFormattedDayTransformer, DayTagToFormattedTimeTransformer, MillisToFormattedDayTransformer, MillisToFormattedTimeTransformer } from "../services/data.service";

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

@Pipe({
    name: "date",
    pure: false,
    standalone: true
})
export class NgSDateToFormattedDatePipe implements PipeTransform {
    constructor() { }

    transform(key: Date, ignoreMidnight: Boolean = false, time: Boolean = true): any {
        const t = new MillisToFormattedTimeTransformer(key).result()
        return new MillisToFormattedDayTransformer(key).result() + (time ? ((ignoreMidnight && t == "00:00") ? "" : " - " + t) : "")
    }
}

@Pipe({
    name: "time",
    pure: false,
    standalone: true
})
export class NgSDateToFormattedTimePipe implements PipeTransform {
    constructor() { }

    transform(key: Date): any {
        return new MillisToFormattedTimeTransformer(key).result()
    }
}