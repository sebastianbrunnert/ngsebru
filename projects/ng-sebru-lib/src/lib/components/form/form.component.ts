import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgSInput } from "../input/input.component";
import { IsIteratableCheck } from "../../services/data.service";
import { NgSError } from "../../models/Error";

@Component({
	selector: "ngs-form",
	templateUrl: "./form.component.html"
})
export class NgSFormComponent {
	@Input("ngSForm")
	public ngSForm: NgSForm = new NgSForm()

	@Input("submitText")
	public submitText: String = "FORM_DEFAULT_SEND"

	@Output()
	public checkSubmit = new EventEmitter<Boolean>();

	public submit() {
		if(!this.ngSForm.loading && this.ngSForm.checkFilledAll() && this.ngSForm.checkTestAll()) {
			this.checkSubmit.emit()
			this.ngSForm.onSubmit()
		}
	}
}

export class NgSForm {
	public inputs: NgSInput[] = []
	public loading: Boolean = false

	constructor(...ngSFormInputs: NgSInput[]) {
		this.inputs = ngSFormInputs
	}

	public isExistant(): Boolean {
		return this.inputs.length > 0
	}

	public reset() {
		this.inputs.forEach(input => {
			if(new IsIteratableCheck(input.defaultValue).result()) {
				input.value = [...input.defaultValue]
			} else {
				input.value = input.defaultValue
			}
			input.mark = ""
			input.onReset()
		})
		this.setLoading(false)
	}

	public setLoading(loading: Boolean) {
		this.loading = loading
	}

	public showError(ngSError: NgSError) {
		this.setLoading(false)
		this.getNgSInput(ngSError.levelDescription).mark = ngSError.error
	}

	public addNgSInput(ngSInput: NgSInput) {
		this.inputs.push(ngSInput)
	}

	public getNgSInput(id: String): NgSInput {
		return this.inputs.find(input => input.id == id)!
	}

	public getNgSInputByName(name: String): NgSInput {
		return this.inputs.find(input => input.name == name)!
	}

	public checkTestAll(): Boolean {
		let result = true
		this.inputs.forEach(input => {
			if(!input.checkTest()) {
				result = false
			}
		})
		return result
	}

	public checkFilledAll(): Boolean {
		let result = true
		this.inputs.forEach(input => {
			if(!input.checkFilled()) {
				result = false
			}
		})
		return result
	}

	public onSubmit() {}
}