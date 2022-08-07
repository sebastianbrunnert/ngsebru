import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgSInjector } from "../../../private-api";
import { NgSPageService } from "../../services/page.service";
import { NgSForm } from "../form/form.component";

@Component({
	selector: "ngs-modal",
	templateUrl: "./modal.component.html"
})
export class NgSModalComponent implements OnInit, AfterViewInit {
	@Input("modal")
	public modal: NgSModalBuilder = new NgSModalBuilder()

	@ViewChild("modalContent", {read: TemplateRef})
	public modalContent?: TemplateRef<any>

	constructor(
		private ngbModal: NgbModal
	) {}

	ngOnInit(): void {
		this.modal?.setNgSModalComponent(this)
	}

	ngAfterViewInit(): void {
		this.onLoad()
	}

	public open() {
		this.ngbModal.open(this.modalContent, {size:this.modal.type.toString()})
	}

	public close() {
		this.ngbModal.dismissAll()
	}

	public onLoad() {}
}

export class NgSModalBuilder {

	private ngSModalComponent?: NgSModalComponent
	public title: String = ""
	public type: NgSModalType = NgSModalType.S
	public buttons: NgSModalButton[] = []
	public text: String = ""
	public ngSForm: NgSForm = new NgSForm()
	
	public setNgSModalComponent(ngSModalComponent: NgSModalComponent): NgSModalBuilder {
		this.ngSModalComponent = ngSModalComponent
		return this
	}

	public setTitle(title: String): NgSModalBuilder {
		this.title = title
		return this
	}

	public setType(type: NgSModalType): NgSModalBuilder {
		this.type = type
		return this
	}

	public addButton(button: NgSModalButton): NgSModalBuilder {
		this.buttons.push(button)
		return this
	}

	public setText(text: String): NgSModalBuilder {
		this.text = text
		return this
	}

	public setNgSForm(ngSForm: NgSForm): NgSModalBuilder {
		this.ngSForm = ngSForm
		return this
	}

	public open() {
		if(!this.ngSModalComponent) {
			this.ngSModalComponent = NgSInjector.get(NgSPageService).createComponent(NgSModalComponent).instance
			this.ngSModalComponent.modal = this
			this.ngSModalComponent.onLoad = () => {
				this.ngSModalComponent?.open()
			}
		} else {
			this.ngSModalComponent?.open()
		}
	}

	public close() {
		this.ngSModalComponent?.close()
	}
}

export class NgSModalButton {
	constructor(
		public title: String = "",
		public highlighted: Boolean = false,
		public onClick: () => void = () => {}
	) {}
}

export enum NgSModalType {
	S = "",
	L = "lg",
	XL = "xl"
}