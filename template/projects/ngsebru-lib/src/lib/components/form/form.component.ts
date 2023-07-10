import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgSError } from "../../models/error.model"
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { NgSInput, NgSInputComponent } from "../input/input.component"

@Component({
    selector: "ngs-form",
    templateUrl: "./form.component.html",
    standalone: true,
    imports: [NgSInputComponent, CommonModule, NgSLangPipe]
})
export class NgSFormComponent {

    @Input("form")
    public form: NgSForm = new NgSForm()

    @Output()
    public submitValid = new EventEmitter<Boolean>();

    public validate() {
        if (!this.form.submitable) {
            return
        }
        if (this.form.submit()) {
            this.submitValid.emit()
        }
    }
}

export class NgSForm {
    public submitText: String = "FORM_DEFAULT_SEND"
    public inputs: NgSInput[] = []
    public loading: Boolean = false
    public submitable: Boolean = true
    public showButton: Boolean = true

    constructor(...ngSFormInputs: NgSInput[]) {
        this.inputs = ngSFormInputs
    }

    public isExistant(): Boolean {
        return this.inputs.length > 0
    }

    public reset() {
        this.inputs.forEach(input => {
            input.reset()
        })
        this.setLoading(false)
    }

    public setLoading(loading: Boolean): NgSForm {
        this.loading = loading
        return this
    }

    public setShowButton(showButton: Boolean): NgSForm {
        this.showButton = showButton
        return this
    }

    public setSubmitText(submitText: String): NgSForm {
        this.submitText = submitText
        return this
    }

    public showError(ngSError: NgSError) {
        this.setLoading(false)
        this.getNgSInput(ngSError.description).mark = ngSError.message
    }

    public addNgSInput(ngSInput: NgSInput) {
        this.inputs.push(ngSInput)
    }

    public getNgSInput(id: String): NgSInput {
        return this.inputs.find(input => input.id == id)!
    }

    public getNgSInputByLabel(label: String): NgSInput {
        return this.inputs.find(input => input.label == label)!
    }

    public setSubmitable(submitable: Boolean) {
        this.submitable = submitable
    }

    public checkValidation(): Boolean {
        let result = true
        this.inputs.forEach(input => {
            if (!input.checkValidation()) {
                result = false
            }
        })
        return result
    }

    public checkFilled(): Boolean {
        let result = true
        this.inputs.forEach(input => {
            if (!input.checkFilled()) {
                result = false
            }
        })
        return result
    }

    public submit(): Boolean {
        if (!this.loading && this.checkFilled() && this.checkValidation()) {
            this.setLoading(true)
            this.onSubmit()
            return true
        }
        return false
    }

    public onSubmit() { }

    public getValues(): Object {
        let result: {
            [key: string]: any
        } = {}
        this.inputs.forEach(input => {
            result[input.id as string] = input.value
        })
        return result
    }

}