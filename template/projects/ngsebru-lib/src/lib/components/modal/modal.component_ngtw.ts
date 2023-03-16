import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { NgSInjector } from "projects/ngsebru-lib/src/public-api";
import { NgSColor } from "../../models/color.model";
import { NgSLangPipe } from "../../pipes/lang.pipe";
import { NgSPageService } from "../../services/page.service";
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

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    @ViewChild('contentWrapper', { static: true }) contentWrapper: TemplateRef<any> | undefined;

    get hasContent(): boolean {
        return !!this.contentWrapper && !!this.contentWrapper.createEmbeddedView({});
    }

    ngOnInit() {
        this.modal.setNgSModalComponent(this)
    }

    ngAfterViewInit() {
        this.onLoad()
        this.changeDetectorRef.detectChanges()
    }

    public onLoad() { }

}

export class NgSModal {

    public title: String = ""
    public type: String = NgSModalType.L
    public buttons: NgSModalButton[] = []
    public text?: String
    public ngSForm?: NgSForm
    public active: Boolean = false
    private ngSModalComponent?: NgSModalComponent

    public setNgSModalComponent(ngSModalComponent: NgSModalComponent): NgSModal {
        this.ngSModalComponent = ngSModalComponent
        return this
    }

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
        if (!this.ngSModalComponent) {
            this.ngSModalComponent = NgSInjector.get(NgSPageService).createComponent(NgSModalComponent).instance
            this.ngSModalComponent.modal = this
            this.ngSModalComponent.onLoad = () => {
                this.active = true
            }
        } else {
            this.active = true
        }
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