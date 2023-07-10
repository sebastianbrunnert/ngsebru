import { Component, Input } from '@angular/core';
import { NgSLangPipe } from '../../pipes/lang.pipe';
import { NgSPageService } from '../../services/page.service';
import { NgSIconComponent } from '../icons/icon.component';
import { NgSEnterLeaveComponent } from '../structure/enter-leave.component';

@Component({
    selector: 'ngs-alert',
    templateUrl: './alert.component.html',
    standalone: true,
    imports: [NgSEnterLeaveComponent, NgSIconComponent, NgSLangPipe]
})
export class NgSAlertComponent {

    public alert: NgSAlert = new NgSAlert()

    @Input("id")
    public id: String = ""

    constructor(
        public pageService: NgSPageService
    ) { }

    get loadAlert(): NgSAlert {
        this.alert = this.pageService.findAlert(this.id) || this.alert
        return this.alert
    }
}

export class NgSAlert {
    public id?: String = ""
    public type: String = NgSAlertType.DEFAULT
    public message: String = ""
}

export class NgSAlertType {
    public static DANGER = "red"
    public static SUCCESS = "green"
    public static DEFAULT = "blue"
}