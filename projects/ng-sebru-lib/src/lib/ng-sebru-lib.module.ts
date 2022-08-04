import { CommonModule } from '@angular/common';
import { Injector, NgModule, ViewContainerRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSInputComponent, NgSFormComponent, NgSDataService, NgSLangService, NgSRestService, NgSLangPipe } from '../public-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgSPageService } from './services/page.service';
import { NgSAlertComponent } from './components/alert/alert.component';
import { NgSSpinnerComponent } from './components/spinner/spinner.component';
import { NgSModalComponent } from './components/modal/modal.component';
import { NgSCardComponent } from './components/card/card.component';

@NgModule({
	declarations: [
		NgSInputComponent,
		NgSFormComponent,
		NgSAlertComponent,
		NgSSpinnerComponent,
		NgSModalComponent,
		NgSCardComponent,
		NgSLangPipe
	],
	providers: [
		NgSDataService,
		NgSPageService,
		NgSRestService,
		NgSLangPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CKEditorModule,
		DragDropModule,
		HttpClientModule
	],
	exports: [
		NgSInputComponent,
		NgSFormComponent,
		NgSAlertComponent,
		NgSSpinnerComponent,
		NgSModalComponent,
		NgSCardComponent,
		NgSLangPipe
	]
})
export class NgSebruLibModule { 

	constructor(private injector: Injector) {
		NgSInjector = injector
	}

}

let NgSInjector: Injector
let NgSViewContainerRef: ViewContainerRef

function SetNgSViewContainerRef(viewContainerRef: ViewContainerRef) {
	NgSViewContainerRef = viewContainerRef
}

export { NgSInjector, NgSViewContainerRef, SetNgSViewContainerRef }