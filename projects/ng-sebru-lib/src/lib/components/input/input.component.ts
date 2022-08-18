import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import * as Editor from 'projects/ng-sebru-lib/assets/ngs-ckeditor';
import { IsIteratableCheck } from '../../services/data.service';
import { NgSInjector } from "../../../private-api";
import { NgSLangService } from '../../services/lang.service';

@Component({
	selector: 'ngs-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss']
})
export class NgSInputComponent {
	@Input("ngSInput")
	public ngSInput: NgSInput = new NgSInput("", "", "")
}

export class NgSInput {
	public id: String = Math.random().toString(16).slice(2)

	public value: any = ""
	public defaultValue: any

	public name: String = ""
	public type: String = ""
	public mark: String = ""
	public suffix: String = ""
	public prefix: String = ""
	public required: Boolean = true
	public disabled: boolean = false
	public icon: String = ""
	public placeholder: String = "INPUT_DEFAULT_PLACEHOLDER"

	constructor(name: String, type: String, id: String) {
		this.name = name;
		this.type = type
		if (id != "") {
			this.id = id
		}
	}

	public test: (value: any) => Boolean = (value: any) => true;

	public onReset() { }

	public onIconClick() { }

	public checkTest() {
		if (!this.required && this.value == "") {
			return true
		}

		if (this.mark == "") {
			let test = this.test(this.value)
			if (!test && this.mark == "") {
				const langService = NgSInjector.get(NgSLangService)
				this.mark = langService.getTranslation(this.name) + " " + langService.getTranslation("INPUT_TEST_INVALID") + "."
			}
			return test
		}
		return false
	}

	public checkFilled(): Boolean {
		this.mark = ""
		let filled = (this.value != "" && this.value != null && this.value != undefined && this.value != []) || !this.required;
		if (!filled) {
			const langService = NgSInjector.get(NgSLangService)
			this.mark = langService.getTranslation(this.name) + " " + langService.getTranslation("INPUT_REQUIRED") + "."
		}
		return filled
	}

	public setRequired(required: Boolean): NgSInput {
		this.required = required
		return this
	}

	public setIcon(icon: String): NgSInput {
		this.icon = icon
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

	public setPlaceholder(placeholder: String): NgSInput {
		this.placeholder = placeholder
		return this
	}

	public setValue(value: any): NgSInput {
		this.value = value
		return this
	}

	public setStartValue(value: any): NgSInput {
		this.value = value
		this.defaultValue = new IsIteratableCheck(value).result() ? [...value] : value
		return this
	}

	public setDisabled(disabled: Boolean): NgSInput {
		this.disabled = disabled as boolean
		return this
	}
}

export class NgSTextInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "text", id)
		this.setStartValue("")
	}
}

export class NgSDateTimeInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "datetime-local", id)
		this.setStartValue("")
	}
}

export class NgSDateInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "date", id)
		this.setStartValue("")
	}
}

export class NgSTimeInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "time", id)
		this.setStartValue("")
	}
}

export class NgSTextAreaInput extends NgSInput {

	public rows: Number = 3

	constructor(name: String, id: String = "") {
		super(name, "textarea", id)
		this.setStartValue("")
	}

	public setRows(rows: Number): NgSTextAreaInput {
		this.rows = rows
		return this
	}
}

export class NgSTextEditorInput extends NgSInput {
	public Editor = Editor

	constructor(name: String, id: String = "") {
		super(name, "textEditor", id)
		this.setStartValue("")
	}
}


export class NgSEmailInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "email", id)
		this.setStartValue("")
	}
}

export class NgSPasswordInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "password", id)
		this.setStartValue("")
	}
}

export class NgSNumberInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "number", id)
		this.setStartValue(0.00)
	}
}

export class NgSFileInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "file", id)
		this.setStartValue("")
	}

	public upload() {
		const files = (<HTMLInputElement>document.getElementById(this.id as string)).files!
		if (files.length > 0) {
			this.setValue(files.item(0))
		}
	}

	public onReset(): void {
		const element = (<HTMLInputElement>document.getElementById(this.id as string))
		if (element != null) {
			element.value = ""
		}
	}
}

export class NgSImagesInput extends NgSInput {

	public previews: String[] = []

	constructor(name: String, id: String = "") {
		super(name, "images", id)
		this.setStartValue([])
	}

	public upload() {
		const uploadedFiles = (<HTMLInputElement>document.getElementById(this.id as string)).files!
		if (uploadedFiles.length > 0) {
			let files: File[] = []
			for (var i = 0; i < uploadedFiles.length; i++) {
				const file: File = uploadedFiles.item(i)!
				const fileName: String = file.name.toLowerCase()
				if (file == null) {
					this.mark = NgSInjector.get(NgSLangService).getTranslation("INPUT_FILE_NOT_READABLE")
				} else if (!(fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg") || fileName.endsWith(".svg") || fileName.endsWith(".svg"))) {
					this.mark = NgSInjector.get(NgSLangService).getTranslation("INPUT_FILE_NOT_IMAGE")
				} else {
					files.push(uploadedFiles.item(i)!)
					const reader: FileReader = new FileReader()
					reader.onload = () => {
						this.previews.push(reader.result as string)
					}
					reader.readAsDataURL(file)
				}
			}
			this.value = this.value.concat(files)
		}
	}

	public remove(index: Number) {
		this.value.splice(index, 1)
		this.previews.splice(index as number, 1)
	}

	public open() {
		document.getElementById(this.id as string)!.click()
	}
}

export class NgSImageInput extends NgSInput {

	public preview: String = ""

	constructor(name: String, id: String = "") {
		super(name, "image", id)
		this.setStartValue("")
	}

	public upload() {
		const uploadedFiles = (<HTMLInputElement>document.getElementById(this.id as string)).files!
		if (uploadedFiles.length > 0) {
			const file: File = uploadedFiles.item(0)!
			const fileName: String = file.name.toLowerCase()
			if (file == null) {
				this.mark = NgSInjector.get(NgSLangService).getTranslation("INPUT_FILE_NOT_READABLE")
			} else if (!(fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg") || fileName.endsWith(".svg") || fileName.endsWith(".svg"))) {
				this.mark = NgSInjector.get(NgSLangService).getTranslation("INPUT_FILE_NOT_IMAGE")
			} else {
				const reader: FileReader = new FileReader()
				reader.onload = () => {
					this.preview = reader.result as string
				}
				reader.readAsDataURL(file)
			}
			this.value = file
		}
	}

	public remove() {
		this.value = ""
		this.preview = ""
	}

	public open() {
		document.getElementById(this.id as string)!.click()
	}

	public onReset(): void {
		this.preview = ""
	}
}

export class NgSFilesInput extends NgSInput {
	constructor(name: String, id: String = "") {
		super(name, "files", id)
		this.setStartValue([])
	}

	public upload() {
		const uploadedFiles = (<HTMLInputElement>document.getElementById(this.id as string)).files!
		if (uploadedFiles.length > 0) {
			let files: File[] = []
			for (var i = 0; i < uploadedFiles.length; i++) {
				files.push(uploadedFiles.item(i)!)
			}
			this.value = this.value.concat(files)
		}
	}

	public remove(value: File) {
		if (this.value.includes(value)) {
			this.value.splice(this.value.indexOf(value), 1)
		}
	}

	public open() {
		document.getElementById(this.id as string)!.click()
	}
}

export class NgSSelectInput extends NgSInput {
	public options: String[] = []

	constructor(name: String, options: String[], id: String = "") {
		super(name, "select", id)
		this.options = options
		this.setStartValue(null)
	}

	onChange() { }

	change(event: Event) {
		this.value = this.options[(event.target as any)["selectedIndex"] - 1]
		this.onChange()
	}
}

export class NgSCheckInput extends NgSInput {

	constructor(name: String, id: String = "") {
		super(name, "check", id)
		this.setStartValue(false)
	}

}

export class NgSDragDropInput extends NgSInput {

	constructor(name: String, value: String[], id: String = "") {
		super(name, "dragDrop", id)
		this.setStartValue(value)
	}

	public onMove(previousIndex: number, currentIndex: number) { }

	moveBlock(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.value, event.previousIndex, event.currentIndex)
		this.onMove(event.previousIndex, event.currentIndex)
	}

}

export class NgSMultipleSelectInput extends NgSInput {

	public options: String[] = []

	constructor(name: String, options: String[], id: String = "") {
		super(name, "multipleSelect", id)
		this.options = options
		this.setStartValue([])
	}

	choose() {
		let select: HTMLSelectElement = <HTMLSelectElement>document.getElementById(this.id as string)!

		if (this.value.indexOf(select.value) != -1) {
			this.value.splice(this.value.indexOf(select.value), 1)
		} else {
			this.value.push(select.value)
		}

		select.value = ""
	}
}

export class NgSMultipleTextInput extends NgSInput {

	public internValue: String = ""

	constructor(name: String, id: String = "") {
		super(name, "multipleText", id)
		this.setIcon("plus")
		this.setStartValue([])
	}

	add() {
		if (this.internValue != "" && !this.value.includes(this.internValue)) {
			this.value.push(this.internValue)
			this.internValue = ""
		}
	}

	remove(value: String) {
		if (this.value.includes(value)) {
			this.value.splice(this.value.indexOf(value), 1)
		}
	}

	enter(event: any) {
		if (this.internValue != "" && event.key == "Enter") {
			event.preventDefault()
			this.add()
		}
	}
}