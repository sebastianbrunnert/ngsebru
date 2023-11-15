import { CommonModule } from "@angular/common";
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
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
export class NgSModalComponent implements OnInit, AfterContentInit, AfterViewInit {

    @Input("onBack")
    public onBack?: () => void;

    @Input("modal")
    public modal: NgSModal = new NgSModal();

    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    @ViewChild('contentWrapper', { static: true }) contentWrapper: TemplateRef<any> | undefined;

    get hasContent(): boolean {
        if (this.contentWrapper == null) {
            return false
        }
        var view = this.contentWrapper?.createEmbeddedView({});
        return view != null && view.rootNodes.length > 0;
    }

    ngOnInit() {
        this.modal.setNgSModalComponent(this)
    }

    ngAfterViewInit() {
        this.onLoad()
    }

    ngAfterContentInit() {
        this.changeDetectorRef.detectChanges()
    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        if (this.modal.closeable) {
            this.modal.close()
        }
    }

    public onLoad() { }

}

export class NgSModal {

    public title: String = ""
    public subtitle: String = ""
    public type: String = NgSModalType.L
    public buttons: NgSModalButton[] = []
    public text?: String
    public ngSForm?: NgSForm
    public active: Boolean = false
    private ngSModalComponent?: NgSModalComponent
    public closeable: Boolean = true

    public setNgSModalComponent(ngSModalComponent: NgSModalComponent): NgSModal {
        this.ngSModalComponent = ngSModalComponent
        return this
    }

    public setTitle(title: String): NgSModal {
        this.title = title
        return this
    }

    public setSubtitle(subtitle: String): NgSModal {
        this.subtitle = subtitle
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

    public setNgSForm(ngSForm?: NgSForm): NgSModal {
        this.ngSForm = ngSForm
        return this
    }

    public setCloseable(closeable: Boolean): NgSModal {
        this.closeable = closeable
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
        public onClick: () => void = () => { },
        public loading: Boolean = false,
    ) { }

    public setLoading(loading: Boolean): NgSModalButton {
        this.loading = loading
        return this
    }
}

export class NgSModalType {
    public static S = "md"
    public static L = "2xl"
    public static XL = "4xl"
}