import { Pipe, PipeTransform } from "@angular/core";
import { DayTagToFormattedDayTransformer } from "../services/data.service";

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