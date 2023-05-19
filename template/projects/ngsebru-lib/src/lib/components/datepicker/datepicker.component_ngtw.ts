import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { DateToDayTagTransformer, DayTagToDateTransformer, IsEmptyCheck, MonthGenerator, WeekdaysAbbrGenerator } from "../../services/data.service";
import { NgSIconComponent } from "../icons/icon.component";

@Component({
    selector: "ngs-datepicker",
    standalone: true,
    templateUrl: "./datepicker.component.html",
    imports: [NgSIconComponent, NgSLangPipe, CommonModule]
})
export class NgSDatepickerComponent implements OnInit, OnChanges {

    @Input("selected")
    public selected: String = "";

    @Input("month")
    public currentMonth: Number = -1;

    @Input("year")
    public currentYear: Number = -1;

    @Input("min")
    public min: String = "";

    @Input("max")
    public max: String = "";

    @Input("blocked")
    public blocked: String[] = [];

    public days: CalendarDay[] = [];

    @Output()
    public onSelected: EventEmitter<String> = new EventEmitter<String>();

    ngOnChanges(changes: SimpleChanges): void {
        this.loadDays();
    }

    ngOnInit(): void {
        const date = new IsEmptyCheck(this.selected).result() ? new Date() : new DayTagToDateTransformer(this.selected).result();

        if (this.currentMonth == -1) {
            this.currentMonth = date.getMonth();
        }
        if (this.currentYear == -1) {
            this.currentYear = date.getFullYear();
        }

        this.loadDays();
    }

    public nextMonth(): void {
        if (this.currentMonth == 11) {
            this.currentMonth = 0;
            this.currentYear = this.currentYear as number + 1;
        } else {
            this.currentMonth = this.currentMonth as number + 1;
        }

        this.loadDays();
    }

    public prevMonth(): void {
        if (this.currentMonth == 0) {
            this.currentMonth = 11;
            this.currentYear = this.currentYear as number - 1;
        } else {
            this.currentMonth = this.currentMonth as number - 1;
        }

        this.loadDays();
    }

    public selectDay(day: CalendarDay): void {
        if (day.blocked) return

        const date = new DayTagToDateTransformer(day.dayTag).result();
        if (date.getMonth() != this.currentMonth) {
            this.loadDays();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
        }

        this.selected = day.dayTag;
        this.onSelected.emit(day.dayTag);
    }

    private loadDays(): void {
        this.days = [];

        const firstDayOfMonth = new Date(this.currentYear as number, this.currentMonth as number, 1);
        const daysInMonth = new Date(this.currentYear as number, this.currentMonth as number + 1, 0).getDate();

        for (let i = firstDayOfMonth.getDay() - 2; i >= 0; i--) {
            this.days.push({
                index: -1,
                dayTag: "",
                blocked: true
            })
        }
        for (let i = firstDayOfMonth.getDay() - 1; i < daysInMonth + firstDayOfMonth.getDay() - 1; i++) {
            const dayTag = new DateToDayTagTransformer(new Date(this.currentYear as number, this.currentMonth as number, i - firstDayOfMonth.getDay() + 2)).result();
            this.days.push({
                index: i - firstDayOfMonth.getDay() + 2,
                dayTag: dayTag,
                blocked: this.isBlocked(dayTag)
            })
        }
        const daysInNextMonth = 42 - this.days.length;
        for (let i = 1; i <= daysInNextMonth; i++) {
            this.days.push({
                index: -1,
                dayTag: "",
                blocked: true
            })
        }
    }

    public isBlocked(dayTag: String) {
        return (this.min != "" && this.min.localeCompare(dayTag as string) > 0)
            || (this.max != "" && this.max.localeCompare(dayTag as string) < 0)
            || this.blocked.includes(dayTag as string);
    }

    get monthName(): String {
        return new MonthGenerator().result()[this.currentMonth as number];
    }

    get weekdays(): String[] {
        return new WeekdaysAbbrGenerator().result();
    }
}

export class CalendarDay {
    public index: Number = 0;
    public dayTag: String = "";
    public blocked: Boolean = false;
}