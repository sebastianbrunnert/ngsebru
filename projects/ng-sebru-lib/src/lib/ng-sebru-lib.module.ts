import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SetNgSInjector } from '../private-api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgChartsModule } from 'ng2-charts';
import { NgSPageService } from './services/page.service';
import { NgSDataService } from './services/data.service';
import { NgSAlertComponent } from './components/alert/alert.component';
import { NgSSpinnerComponent } from './components/spinner/spinner.component';
import { NgSModalComponent } from './components/modal/modal.component';
import { NgSCardComponent } from './components/card/card.component';
import { NgSFormComponent } from './components/form/form.component';
import { NgSInputComponent } from './components/input/input.component';
import { NgSLangPipe } from './pipes/lang.pipe'
import { NgSDefaultNavigationComponent } from '../public-api';
import { NgSBarChartComponent, NgSLineChartComponent } from './components/chart/chart.component';
import { NgSCollapsableComponent } from './components/collapsable/collapsable.component';
import { NgSCollapsablesComponent } from './components/collapsable/collapsables/collapsables.component';

@NgModule({
	declarations: [
		NgSInputComponent,
		NgSFormComponent,
		NgSAlertComponent,
		NgSSpinnerComponent,
		NgSModalComponent,
		NgSCardComponent,
		NgSDefaultNavigationComponent,
		NgSLineChartComponent,
		NgSBarChartComponent,
		NgSCollapsableComponent,
		NgSCollapsablesComponent,
		NgSLangPipe
	],
	providers: [
		NgSDataService,
		NgSPageService,
		NgSLangPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		NgbModule,
		CKEditorModule,
		DragDropModule,
		HttpClientModule,
		NgChartsModule
	],
	exports: [
		NgSInputComponent,
		NgSFormComponent,
		NgSAlertComponent,
		NgSSpinnerComponent,
		NgSModalComponent,
		NgSDefaultNavigationComponent,
		NgSCardComponent,
		NgSLineChartComponent,
		NgSBarChartComponent,
		NgSCollapsableComponent,
		NgSCollapsablesComponent,
		NgSLangPipe
	]
})
export class NgSebruLibModule { 

	constructor(private injector: Injector) {
		SetNgSInjector(injector)
	}

}