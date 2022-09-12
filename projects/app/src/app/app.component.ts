import { Component, ViewContainerRef } from '@angular/core';
import { SetNgSViewContainerRef } from 'projects/ng-sebru-lib/src/public-api';
import { Language, NgSLangService, NgSRestService, RestBuilder } from 'projects/ng-sebru-lib/src/public-api';
import { environment } from '../environments/environments';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

	constructor(
		viewContainerRef: ViewContainerRef,
		private authService: AuthService,
		private restService: NgSRestService,
		private langService: NgSLangService
	) {
		SetNgSViewContainerRef(viewContainerRef)
		this.restService.setDefaultEndopint(environment.endpoint)

		this.langService.getLanguage = (id: String) => {
			return new Promise((resolve) => {
				new RestBuilder(this.restService).setUrl("language/" + id).get().then((language: Language) => {
					resolve(language)
				})
			})
		}

		this.langService.getLanguages = () => {
			return new Promise((resolve) => {
				new RestBuilder(this.restService).setUrl("language").get().then((languages: Language[]) => {
					resolve(languages)
				})
			})
		}

		this.langService.load()
	}
}
