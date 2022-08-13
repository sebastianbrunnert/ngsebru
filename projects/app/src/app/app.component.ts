import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/private-api';
import { NgSCollapsables, NgSRestService } from 'projects/ng-sebru-lib/src/public-api';
import { environment } from '../environments/environments';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	public ngSCollapsables: NgSCollapsables = new NgSCollapsables(["A","B","C","D","E"])

	constructor(
		viewContainerRef: ViewContainerRef,
		private restService: NgSRestService
	) {
		SetNgSViewContainerRef(viewContainerRef)
		this.restService.setDefaultEndopint(environment.endpoint)
	}
}
