import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgSColor } from "../../models/color.model";
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { NgSForm, NgSFormComponent } from "../form/form.component";
import { NgSIconComponent } from "../icons/icon.component";
import { NgSEnterLeaveComponent } from "../structure/enter-leave.component";

@Component({
    selector: "ngs-modal",
    templateUrl: "./modal.component.html",
    standalone: true,
    imports: [NgSEnterLeaveComponent, CommonModule, NgSIconComponent, NgSFormComponent, NgSLangPipe]
})
export class NgSModalComponent implements OnInit, AfterViewInit {

    @Input("modal")
    public modal: NgSModal = new NgSModal();

    @ViewChild("modalContent", { read: TemplateRef })
    public modalContent?: TemplateRef<any>;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() { }
}

export class NgSModal {

    public title: String = ""
    public type: String = NgSModalType.L
    public buttons: NgSModalButton[] = []
    public text: String = ""
    public ngSForm: NgSForm = new NgSForm()
    public active: Boolean = false

    public setTitle(title: String): NgSModal {
        this.title = title
        return this
    }

    public setType(type: String): NgSModal {
        this.type = type
        return this
    }

    public addButton(button: NgSModalButton): NgSModal {
        this.buttons.push(button)
        return this
    }

    public setText(text: String): NgSModal {
        this.text = text
        return this
    }

    public setNgSForm(ngSForm: NgSForm): NgSModal {
        this.ngSForm = ngSForm
        return this
    }

    public open() {
        this.active = true
    }


    public close() {
        this.active = false
    }

}

export class NgSModalButton {
    constructor(
        public title: String = "",
        public color: String = NgSColor.GRAY_400,
        public hoverColor: String = NgSColor.GRAY_600,
        public onClick: () => void = () => { }
    ) { }
}

export class NgSModalType {
    public static S = "md"
    public static L = "2xl"
    public static XL = "3xl"
}