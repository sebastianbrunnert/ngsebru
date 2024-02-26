import * as shajs from "sha.js"
import { NgSInjector } from "../../public-api"
import { NgSLangService } from "./lang.service"

export class NgSCheck {
    constructor(public value: any) { }

    public result(): Boolean {
        return true
    }
}

export class NgSGenerator {
    constructor(public settings: any = {}) { }

    public result(): any {
        return {}
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
        return Symbol.iterator in Object(this.value) && !(typeof this.value == 'string' || this.value instanceof String) && !(typeof this.value == 'number' || this.value instanceof Number)
    }
}

export class IsEmptyCheck extends NgSCheck {
    public result(): Boolean {
        return this.value == null || this.value == undefined || this.value == "" || (new IsIteratableCheck(this.value).result() && this.value.length == 0);
    }
}

export class Sha256Transformer extends NgSTransformer {
    public result(): String {
        return shajs("sha256").update(this.value).digest("hex")
    }
}

export class RandomKeyGenerator extends NgSGenerator {
    public result(): any {
        return Math.random().toString(16).slice(2)
    }
}

export class UniqueKeyGenerator extends NgSGenerator {
    public result(): any {
        return new Sha256Transformer(Date.now().toString(36) + Math.random().toString(36).substring(2)).result()
    }
}

export class WeekdaysGenerator extends NgSGenerator {
    public result(): String[] {
        return ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    }
}

export class WeekdaysAbbrGenerator extends NgSGenerator {
    public result(): String[] {
        return ["MONDAY_ABBR", "TUESDAY_ABBR", "WEDNESDAY_ABBR", "THURSDAY_ABBR", "FRIDAY_ABBR", "SATURDAY_ABBR", "SUNDAY_ABBR"]
    }
}

export class MonthGenerator extends NgSGenerator {
    public result(): String[] {
        return ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    }
}

/*
Date
*/
export class DateToDayTagTransformer extends NgSTransformer {
    public result(): String {
        const day = this.value.getDate().toString().padStart(2, "0")
        const month = (this.value.getMonth() + 1).toString().padStart(2, "0")
        const year = this.value.getFullYear().toString()

        return year + "-" + month + "-" + day
    }
}

export class DateToMillisTransformer extends NgSTransformer {
    public result(): Number {
        return this.value.getTime()
    }
}

export class DateToFormattedDayTransformer extends NgSTransformer {
    public result(): any {
        const langService: NgSLangService = NgSInjector.get(NgSLangService)

        if (new IsTodayCheck(this.value).result()) {
            return langService.getTranslation("TODAY")
        }

        const day = this.value.getDate().toString().padStart(2, "0")
        const month = (this.value.getMonth() + 1).toString().padStart(2, "0")
        const year = this.value.getFullYear().toString()

        if (new IsYesterdayCheck(this.value).result()) {
            return langService.getTranslation("YESTERDAY") + ", " + day + "." + month + "." + year
        }

        if (new IsTomorrowCheck(this.value).result()) {
            return langService.getTranslation("TOMORROW") + ", " + day + "." + month + "." + year
        }

        const dayTags: String[] = new WeekdaysGenerator().result()

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

/*
DayTag (YYYY-MM-DD)
*/
export class DayTagToDateTransformer extends NgSTransformer {
    public result(): Date {
        return new Date(this.value)
    }
}

export class DayTagToMillisTransformer extends NgSTransformer {
    public result(): Number {
        return new Date(this.value).getTime()
    }
}

export class DayTagToFormattedDayTransformer extends NgSTransformer {
    public result(): any {
        return new DateToFormattedDayTransformer(new DayTagToDateTransformer(this.value).result()).result()
    }
}

export class DayTagToFormattedTimeTransformer extends NgSTransformer {
    public result(): any {
        return new DateToFormattedTimeTransformer(new DayTagToDateTransformer(this.value).result()).result()
    }
}

/*
Millis
*/
export class MillisToDateTransformer extends NgSTransformer {
    public result(): Date {
        return new Date(this.value)
    }
}

export class MillisToDayTagTransformer extends NgSTransformer {
    public result(): String {
        return new Date(this.value + 1000 * 60 * 60).toISOString().slice(0, 10);
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

export class IsTodayCheck extends NgSCheck {
    public result(): Boolean {
        return new Date().toDateString() == this.value.toDateString()
    }
}

export class IsTomorrowCheck extends NgSCheck {
    public result(): Boolean {
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return this.value.toDateString() == tomorrow.toDateString()
    }
}

export class IsYesterdayCheck extends NgSCheck {
    public result(): Boolean {
        let yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return this.value.toDateString() == yesterday.toDateString()
    }
}

export class IsFutureCheck extends NgSCheck {
    public result(): Boolean {
        return this.value.getTime() > new Date().getTime()
    }
}

export class IsPastCheck extends NgSCheck {
    public result(): Boolean {
        return this.value.getTime() < new Date().getTime()
    }
}

export class IsWeekendCheck extends NgSCheck {
    public result(): Boolean {
        return this.value.getDay() == 0 || this.value.getDay() == 6
    }
}

export class IsWeekdayCheck extends NgSCheck {
    public result(): Boolean {
        return !new IsWeekendCheck(this.value).result()
    }
}

/*
Bytes & Storage
*/
export class BytesToStorageTransformer extends NgSTransformer {
    public result(): String {
        const bytes = this.value
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

        if (bytes == 0) {
            return "0 Byte"
        }

        const i = Math.floor(Math.log(bytes) / Math.log(1024))

        return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i]
    }
}

export class KilobytesToStorageTransformer extends NgSTransformer {
    public result(): String {
        return new BytesToStorageTransformer(this.value * 1024).result()
    }
}

export class MegabytesToStorageTransformer extends NgSTransformer {
    public result(): String {
        return new BytesToStorageTransformer(this.value * 1024 * 1024).result()
    }
}

export class GigabytesToStorageTransformer extends NgSTransformer {
    public result(): String {
        return new BytesToStorageTransformer(this.value * 1024 * 1024 * 1024).result()
    }
}

/*
Duration
*/
export class SecondsToDurationTranformer extends NgSTransformer {
    public result(): String {
        const seconds = this.value
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds - (hours * 3600)) / 60)
        const secs = seconds - (hours * 3600) - (minutes * 60)

        const langService = NgSInjector.get(NgSLangService)

        let result = ""
        if (hours > 0) {
            result += hours + " " + langService.getTranslation("HOURS") + " "
        }
        if (minutes > 0) {
            result += minutes + " " + langService.getTranslation("MINUTES") + " "
        }
        if (secs > 0) {
            result += secs + " " + langService.getTranslation("SECONDS")
        }
        return result
    }
}