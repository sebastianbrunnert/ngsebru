import { Component } from "@angular/core";
import { NgSPageService } from "projects/ng-sebru-lib/src/public-api";
import { AuthService } from "../../../core/services/auth.service";

@Component({
	template: "<ngs-spinner></ngs-spinner>"
})
export class StartComponent {

	constructor(
		private authService: AuthService,
		private pageService: NgSPageService
	) {
		if(this.authService.isSuperAdmin()) {
			this.pageService.startSpinner()
		} else {
			this.pageService.navigate("super-admin/login")
		}
	}

}