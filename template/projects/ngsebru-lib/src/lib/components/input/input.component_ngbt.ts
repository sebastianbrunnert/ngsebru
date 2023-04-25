import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSInjector } from "projects/ngsebru-lib/src/public-api";
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { IsIteratableCheck, RandomKeyGenerator } from "../../services/data.service";
import { NgSLangService } from "../../services/lang.service";
import { NgSIconComponent } from "../icons/icon.component";
import { NgSEnterLeaveComponent } from "../structure/enter-leave.component";
import { NgSDatepickerComponent } from "../datepicker/datepicker.component";

@Component({
    selector: "ngs-input",
    templateUrl: "./input.component.html",
    standalone: true,
    styleUrls: ["./input.component.scss"],
    imports: [CommonModule, FormsModule, NgSLangPipe, NgSIconComponent, NgSEnterLeaveComponent, NgSDatepickerComponent]
})
export class NgSInputComponent {

    @Input("input") public input?: NgSInput;

}

export enum NgSInputType {
    TEXT = "text",
    NUMBER = "number",
    TEXT_AREA = "textarea",
    DATE = "date",
    TIME = "time",
    DATE_TIME = "datetime",
    PASSWORD = "password",
    SELECT = "select",
    CUSTOM_FILE = "custom-file",
    COLOR = "color",
    CHECKBOX = "checkbox"
}

export class NgSInput {

    public id: String = new RandomKeyGenerator().result()

    public value: any = null
    public defaultValue: any = null

    public label: String = ""
    public type: NgSInputType = NgSInputType.TEXT
    public mark: String = ""
    public suffix: String = ""
    public prefix: String = ""
    public required: Boolean = true
    public disabled: Boolean = false
    public icon: String = ""
    public placeholder: String = "INPUT_DEFAULT_PLACEHOLDER"
    public description: String = ""

    public standalone: Boolean = false

    public showOptional: Boolean = true

    constructor(label: String, type: NgSInputType, id: String = "") {
        this.label = label
        this.type = type
        if (id != "") {
            this.id = id
        }
    }

    public validateInput: (value: any) => Boolean = (value: any) => true;

    public onReset() { }

    public onIconClick() { }

    public onInput(value: any) { }

    public onInputFocus() { }

    public onSubmit() { }

    public checkValidation(): Boolean {
        if (this.mark != "") {
            return false
        }

        let result = this.validateInput(this.value)
        if (!result) {
            if (this.mark == "") {
                const langService = NgSInjector.get(NgSLangService)
                this.mark = langService.getTranslation(this.label) + " " + langService.getTranslation("INPUT_INVALID") + "."
            }
            return false
        }

        return true
    }

    public checkFilled(): Boolean {
        this.mark = ""

        if (!this.required) {
            return true
        }

        let empty = this.value == "" || this.value == null || this.value == undefined || (new IsIteratableCheck(this.value).result() && this.value.length == 0);
        if (empty) {
            const langService = NgSInjector.get(NgSLangService)
            this.mark = langService.getTranslation(this.label) + " " + langService.getTranslation("INPUT_REQUIRED") + "."
        }

        return !empty
    }

    public setRequired(required: Boolean): NgSInput {
        this.required = required
        return this
    }

    public setDisabled(disabled: Boolean): NgSInput {
        this.disabled = disabled
        return this
    }

    public setPlaceholder(placeholder: String): NgSInput {
        this.placeholder = placeholder
        return this
    }

    public setMark(mark: String): NgSInput {
        this.mark = mark
        return this
    }

    public setSuffix(suffix: String): NgSInput {
        this.suffix = suffix
        return this
    }

    public setPrefix(prefix: String): NgSInput {
        this.prefix = prefix
        return this
    }

    public setIcon(icon: String): NgSInput {
        this.icon = icon
        return this
    }

    public setValue(value: any): NgSInput {
        this.value = new IsIteratableCheck(value).result() ? [...value] : value
        return this
    }

    public setDefaultValue(defaultValue: any): NgSInput {
        this.value = new IsIteratableCheck(defaultValue).result() ? [...defaultValue] : defaultValue
        this.defaultValue = new IsIteratableCheck(defaultValue).result() ? [...defaultValue] : defaultValue
        return this
    }

    public setStandalone(standalone: Boolean): NgSInput {
        this.standalone = standalone
        return this
    }

    public setDescription(description: String): NgSInput {
        this.description = description
        return this
    }

    public setShowOptional(showOptional: Boolean): NgSInput {
        this.showOptional = showOptional
        return this
    }

    public reset() {
        this.value = new IsIteratableCheck(this.defaultValue).result() ? [...this.defaultValue] : this.defaultValue
        this.mark = ""
        this.onReset()
    }

    public submit() {
        if (this.checkFilled() && this.checkValidation()) {
            this.onSubmit()
        }
    }
}

export class NgSTextInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.TEXT, id)
    }
}

export class NgSPasswordInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.PASSWORD, id)
    }
}

export class NgSNumberInput extends NgSInput {

    public min?: Number
    public max?: Number
    public steps: Number = 1

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.NUMBER, id)
    }

    public setMin(min: Number): NgSNumberInput {
        this.min = min
        return this
    }

    public setMax(max: Number): NgSNumberInput {
        this.max = max
        return this
    }

    public setSteps(steps: Number): NgSNumberInput {
        this.steps = steps
        return this
    }
}

export class NgSTextAreaInput extends NgSInput {

    public rows: Number = 3

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.TEXT_AREA, id)
    }

    public setRows(rows: Number): NgSTextAreaInput {
        this.rows = rows
        return this
    }
}

export class NgSSelectInput extends NgSInput {
    public options: NgSSelectOption[] = []
    public open: Boolean = false
    public selectLabel: String = ""
    public emptyValueDefault: String = ""

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.SELECT, id)
        this.setDefaultValue(null)
    }

    public setValue(value: any): NgSSelectInput {
        this.value = value
        return this;
    }

    public addOption(option: NgSSelectOption): NgSSelectInput {
        if (option.value == this.value) {
            this.selectLabel = option.label
        }
        this.options.push(option)
        return this
    }

    public addOptions(options: NgSSelectOption[]): NgSSelectInput {
        options.forEach(option => {
            this.addOption(option)
        })
        return this
    }

    public addOptionStrings(options: String[]): NgSSelectInput {
        options.forEach(option => {
            this.addOptionString(option, option)
        })
        return this
    }

    public addOptionString(label: String, value: String): NgSSelectInput {
        return this.addOption({
            label: label,
            value: value
        })
    }

    public toggle() {
        if (this.disabled) {
            return
        }
        this.open = !this.open
        if (this.open) {
            this.onInputFocus()
        }
    }

    public select(option: NgSSelectOption) {
        this.open = false
        if (option == null) {
            this.value = null
            this.selectLabel = ""
            this.onInput(this.value)
            return;
        }
        this.value = option.value
        this.selectLabel = option.label
        this.onInput(this.value)
    }

    public setEmptyValueDefault(emptyValueDefault: String): NgSSelectInput {
        this.emptyValueDefault = emptyValueDefault
        return this
    }
}

export class NgSSelectOption {
    public value?: String = ""
    public label: String = ""
}

export class NgSColorInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.COLOR, id)
    }
}

export class NgSCheckboxInput extends NgSInput {
    constructor(label: String, id: String = "") {
        super(label, NgSInputType.CHECKBOX, id)
    }
}

export class NgSDateInput extends NgSInput {

    public min: String = ""
    public max: String = ""
    public blocked: String[] = []

    public open: Boolean = false

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.DATE, id)
        this.setIcon("calendar")
        this.setPlaceholder("INPUT_DEFAULT_CHOOSE")
    }

    public setMin(min: String): NgSDateInput {
        this.min = min
        return this
    }

    public setMax(max: String): NgSDateInput {
        this.max = max
        return this
    }

    public setBlocked(blocked: String[]): NgSDateInput {
        this.blocked = blocked
        return this
    }

    public openDatepicker() {
        if (this.open) return
        this.open = true
        this.onInputFocus()
    }
}

export class CustomFileInput extends NgSInput {
    public buttonLabel: String = ""
    public buttonIcon: String = ""

    constructor(label: String, id: String = "") {
        super(label, NgSInputType.CUSTOM_FILE, id)
        this.buttonIcon = "upload"
    }

    public setButtonLabel(label: String): CustomFileInput {
        this.buttonLabel = label
        return this
    }

    public setButtonIcon(icon: String): CustomFileInput {
        this.buttonIcon = icon
        return this
    }
}