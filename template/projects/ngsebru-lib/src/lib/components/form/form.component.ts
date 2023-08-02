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

    public isGroup(input: NgSInput | NgSFormGroup): Boolean {
        return input instanceof NgSFormGroup
    }

    public getGroup(input: NgSInput | NgSFormGroup): NgSFormGroup {
        return input as NgSFormGroup
    }

    public getInput(input: NgSInput | NgSFormGroup): NgSInput {
        return input as NgSInput
    }
}

export class NgSForm implements Checkable {
    public submitText: String = "FORM_DEFAULT_SEND"
    public inputs: (NgSInput | NgSFormGroup)[] = []
    public loading: Boolean = false
    public submitable: Boolean = true
    public showButton: Boolean = true

    constructor(...ngSFormInputs: (NgSInput | NgSFormGroup)[]) {
        this.inputs = ngSFormInputs
    }

    public isExistant(): Boolean {
        return this.inputs.length > 0
    }

    public reset() {
        this.inputs.forEach(input => {
            if (input instanceof NgSInput) {
                input.reset()
            }
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

    public addGroup(ngSFormGroup: NgSFormGroup) {
        this.inputs.push(ngSFormGroup)
    }

    public addNgSInput(ngSInput: NgSInput) {
        this.inputs.push(ngSInput)
    }

    public getNgSInput(id: String): NgSInput {
        for (let input of this.inputs) {
            if (input instanceof NgSInput && input.id == id) {
                return input
            } else if (input instanceof NgSFormGroup) {
                for (let subinput of input.inputs) {
                    if (subinput.id == id) {
                        return subinput
                    }
                }
            }
        }
        throw new Error("No input with id " + id + " found");
    }

    public getNgSInputByLabel(label: String): NgSInput {
        for (let input of this.inputs) {
            if (input instanceof NgSInput && input.label == label) {
                return input
            } else if (input instanceof NgSFormGroup) {
                for (let subinput of input.inputs) {
                    if (subinput.label == label) {
                        return subinput
                    }
                }
            }
        }
        throw new Error("No input with label " + label + " found");
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
            if (input instanceof NgSInput) {
                result[input.id as string] = input.value
            }
        })
        return result
    }

    public getGroupsCount(): number {
        return this.inputs.filter(input => input instanceof NgSFormGroup).length
    }

    public getGroups(): NgSFormGroup[] {
        return this.inputs.filter(input => input instanceof NgSFormGroup) as NgSFormGroup[]
    }

    public getGroup(title: String): NgSFormGroup {
        return this.inputs.find(input => input instanceof NgSFormGroup && input.title == title) as NgSFormGroup
    }

}

export class NgSFormGroup implements Checkable {
    public title: String = ""
    public inputs: NgSInput[] = []

    constructor(title: String, ...ngSFormInputs: NgSInput[]) {
        this.title = title
        this.inputs = ngSFormInputs
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

    public addNgSInput(ngSInput: NgSInput): NgSFormGroup {
        this.inputs.push(ngSInput)
        return this
    }
}

interface Checkable {
    checkValidation(): Boolean
    checkFilled(): Boolean
}