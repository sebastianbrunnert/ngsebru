import { Pipe, PipeTransform } from "@angular/core";
import { DayTagToFormattedDayTransformer, MillisToFormattedTimeTransformer } from "../services/data.service";

@Pipe({
	name: "dayTagToFormattedDay",
	pure: false
})
export class NgSDayTagToFormattedDayPipe implements PipeTransform {
	transform(key: String): any {
		return new DayTagToFormattedDayTransformer(key).result()
	}
}

@Pipe({
	name: "dayTagsToFormattedDays",
	pure: false
})
export class NgSDayTagsToFormattedDaysPipe implements PipeTransform {
	transform(key: String[]): any {
        return key.map(dayTag => new DayTagToFormattedDayTransformer(dayTag).result())
	}
}

@Pipe({
	name: "millisToFormattedTime",
	pure: false
})
export class NgSMillisToFormattedTimePipe implements PipeTransform {
	transform(millis: Number): any {
		return new MillisToFormattedTimeTransformer(millis).result()
	}
}