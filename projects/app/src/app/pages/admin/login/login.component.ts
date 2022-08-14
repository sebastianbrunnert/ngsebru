import { Component } from "@angular/core";
import { NgSForm, NgSPageService, NgSPasswordInput, NgSRestService, RestBuilder, Sha256Transformer } from "projects/ng-sebru-lib/src/public-api";
import { AuthenticationCredentialsResponse } from "../../../core/models/Responses";
import { AuthService } from "../../../core/services/auth.service";

@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {

	public form: NgSForm = new NgSForm(
		new NgSPasswordInput("INPUT_PASSWORD", "password")
	)

	constructor(
		private authService: AuthService,
		private pageService: NgSPageService,
		private restService: NgSRestService
	) {
		if (this.authService.isAdmin()) {
			this.pageService.navigate("admin/start")
		}

		this.form.onSubmit = () => {
			new RestBuilder(this.restService).setUrl("authentication/admin")
				.setInquirer(this.form)
				.addParam("hash", new Sha256Transformer(this.form.getNgSInput("password").value).result())
				.post().then((authenticationCredentials: AuthenticationCredentialsResponse) => {
					this.authService.loginAsAdmin(authenticationCredentials.token, authenticationCredentials.expire)
				})
		}
	}
}