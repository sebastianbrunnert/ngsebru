import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgSError } from "../../models/error.model"
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { NgSClassInputComponent, NgSInput } from "../input/input.component"

@Component({
    selector: "ngs-form",
    templateUrl: "./form.component.html",
    standalone: true,
    imports: [NgSClassInputComponent, CommonModule, NgSLangPipe]
})
export class NgSFormComponent {

    @Input("form")
    public form: NgSForm = new NgSForm()

    @Output()
    public submitValid = new EventEmitter<Boolean>();

    constructor() {

    }

    public validate() {
        if (!this.form.submitable || !this.form.hasInput) {
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
    public hasInput: Boolean = false
    public blockable: Boolean = true

    constructor(...ngSFormInputs: (NgSInput | NgSFormGroup)[]) {
        ngSFormInputs.forEach(input => {
            if (input instanceof NgSFormGroup) {
                this.addGroup(input)
            } else {
                this.addNgSInput(input)
            }
        })
    }

    public isExistant(): Boolean {
        return this.inputs.length > 0
    }

    public reset() {
        this.inputs.forEach(input => {
            if (input instanceof NgSInput) {
                input.reset()
            } else {
                input.inputs.forEach(subinput => {
                    subinput.reset()
                })
            }
        })
        this.setLoading(false)
    }

    public setLoading(loading: Boolean): NgSForm {
        this.loading = loading
        if (!loading) {
            this.onDisableLoading()
            this.setHasInput(false)
        }
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

    public setBlockable(blockable: Boolean): NgSForm {
        this.blockable = blockable
        if (!blockable) {
            this.setHasInput(true)
        }
        return this
    }

    public setHasInput(hasInput: Boolean): NgSForm {
        if (this.blockable) {
            this.hasInput = false
        }
        this.hasInput = hasInput
        return this
    }

    public showError(ngSError: NgSError) {
        this.setLoading(false)
        this.getNgSInput(ngSError.description).mark = ngSError.message
    }

    public addGroup(ngSFormGroup: NgSFormGroup) {
        this.inputs.push(ngSFormGroup)
        ngSFormGroup.inputs.forEach(input => {
            input.onInput = () => {
                this.onInput()
                this.setHasInput(true)
            }
        })
    }

    public addNgSInput(ngSInput: NgSInput) {
        this.inputs.push(ngSInput)
        ngSInput.onInput = (_) => {
            this.onInput()
            this.setHasInput(true)
        }
    }

    public removeNgSInput(ngSInput: NgSInput) {
        this.inputs = this.inputs.filter(input => input != ngSInput)
        ngSInput.onInput = (_) => { }
    }

    public existsNgSInput(id: String): Boolean {
        return this.inputs.some(input => {
            if (input instanceof NgSInput && input.id == id) {
                return true
            } else if (input instanceof NgSFormGroup) {
                return input.inputs.some(subinput => subinput.id == id)
            }
            return false
        })
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

    public getValue(id: String): any {
        try {
            return this.getNgSInput(id).value
        } catch (error) {
            return undefined
        }
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

    public silentSubmit(): Boolean {
        if (!this.loading) {
            return true
        }
        return false
    }

    public submit(): Boolean {
        if (!this.loading && this.checkFilled() && this.checkValidation()) {
            this.setLoading(true)
            this.onSubmit()
            return true
        }
        return false
    }

    public onInput() { }

    public onSubmit() { }

    public onDisableLoading() { }

    public getValues(exclude: String[] = []): Object {
        let result: {
            [key: string]: any
        } = {}
        this.inputs.forEach(input => {
            if (input instanceof NgSInput) {
                if (exclude.includes(input.id as string)) return
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
    public prominent: Boolean = true
    public split: Boolean = true
    public description: String = ""

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

    public setProminent(prominent: Boolean): NgSFormGroup {
        this.prominent = prominent
        return this
    }

    public setSplit(split: Boolean): NgSFormGroup {
        this.split = split
        return this
    }

    public setDescription(description: String): NgSFormGroup {
        this.description = description
        return this
    }
}

interface Checkable {
    checkValidation(): Boolean
    checkFilled(): Boolean
}