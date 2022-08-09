import { Component } from "@angular/core";
import { NgSForm, NgSPageService, NgSTextInput } from "projects/ng-sebru-lib/src/public-api";
import { AuthService } from "../../../core/services/auth.service";

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {

	public form: NgSForm = new NgSForm(
		new NgSTextInput("Passwort","password")
	)

	constructor(
		private authService: AuthService,
		private pageService: NgSPageService,
	) {
		if(this.authService.isSuperAdmin()) {
			this.pageService.navigate("super-admin/start")
		}

		this.form.onSubmit = () => {
			this.authService.loginAsSuperAdmin(this.form.getNgSInput("password").value, Date.now() + 1000 * 60 * 60 * 24 * 7)
		}
	}
}