import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/private-api';
import { NgSRestService } from 'projects/ng-sebru-lib/src/public-api';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	constructor(
		viewContainerRef: ViewContainerRef,
		private restService: NgSRestService
	) {
		SetNgSViewContainerRef(viewContainerRef)
		this.restService.setDefaultEndopint(environment.endpoint)
	}
}
