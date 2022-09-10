import { Injectable } from '@angular/core';
import * as shajs from 'sha.js'
import { NgSInjector } from '../../private-api';
import { NgSLangService } from './lang.service';

@Injectable({
	providedIn: 'root'
})
export class NgSDataService {

	public dayTags: String[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

	public isIteratable(value: any): Boolean {
		return new IsIteratableCheck(value).result()
	}

}

export class NgSCheck {

	constructor(public value: any) { }

	public result(): Boolean {
		return true
	}
}

export class NgSTransformer {
	constructor(public value: any) { }

	public result(): any {
		return this.value
	}
}

export class IsIteratableCheck extends NgSCheck {
	public result(): Boolean {
		return Symbol.iterator in Object(this.value) && !(typeof this.value == 'string' || this.value instanceof String)
	}
}

export class IsTomorrowCheck extends NgSCheck {
	public result(): Boolean {
		let today = new Date()
		let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
		return this.value.getTime() == tomorrow.getTime()
	}
}

export class IsTodayCheck extends NgSCheck {
	public result(): Boolean {
		return new Date().toDateString() == this.value.toDateString()
	}
}

export class Sha256Transformer extends NgSTransformer {
	public result(): any {
		return shajs("sha256").update(this.value).digest("hex")
	}
}

export class DayTagToDateTransformer extends NgSTransformer {
	public result(): any {
		return new Date(this.value)
	}
}

export class MillisToDateTransformer extends NgSTransformer {
	public result(): any {
		return new Date(this.value)
	}
}

export class DayTagToFormattedDayTransformer extends NgSTransformer {
	public result(): any {
		return new DateToFormattedDayTransformer(new DayTagToDateTransformer(this.value).result()).result()
	}
}

export class MillisToFormattedDayTransformer extends NgSTransformer {
	public result(): any {
		return new DateToFormattedDayTransformer(new MillisToDateTransformer(this.value).result()).result()
	}
}

export class MillisToFormattedTimeTransformer extends NgSTransformer {
	public result(): any {
		return new DateToFormattedTimeTransformer(new MillisToDateTransformer(this.value).result()).result()
	}
}

export class DateToFormattedDayTransformer extends NgSTransformer {
	public result(): any {
		const langService: NgSLangService = NgSInjector.get(NgSLangService)

		if (new IsTodayCheck(this.value).result()) {
			return langService.getTranslation("TODAY")
		}

		let day = this.value.getDate().toString()
		let month = (this.value.getMonth() + 1).toString()
		let year = this.value.getFullYear().toString()

		if (day.length == 1) {
			day = "0" + day
		}
		if (month.length == 1) {
			month = "0" + month
		}

		if (new IsTomorrowCheck(this.value).result()) {
			return langService.getTranslation("TOMORROW") + ", " + day + "." + month + "." + year
		}

		const dayTags: String[] = NgSInjector.get(NgSDataService).dayTags

		return langService.getTranslation(dayTags[this.value.getDay() == 0 ? 6 : this.value.getDay() - 1]) + ", " + day + "." + month + "." + year
	}
}

export class DateToFormattedTimeTransformer extends NgSTransformer {
	public result(): any {
		let hour = this.value.getHours().toString()
		let minute = this.value.getMinutes().toString()
		if (hour.length == 1) {
			hour = "0" + hour
		}
		if (minute.length == 1) {
			minute = "0" + minute
		}
		return hour + ":" + minute
	}
}
