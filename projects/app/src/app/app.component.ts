import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/private-api';
import { NgSForm, NgSRestService, NgSTextInput } from 'projects/ng-sebru-lib/src/public-api';
import { environment } from '../environments/environments';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	public form: NgSForm = new NgSForm(
		new NgSTextInput("Name", "name").setButton("trash")
	)

	constructor(
		viewContainerRef: ViewContainerRef,
		private restService: NgSRestService
	) {
		SetNgSViewContainerRef(viewContainerRef)
		this.restService.setDefaultEndopint(environment.endpoint)
	}
}
