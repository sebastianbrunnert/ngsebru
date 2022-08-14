import { Injectable } from "@angular/core";
import { BearerAuthenticationType, NgSPageService, NgSRestService } from "projects/ng-sebru-lib/src/public-api";

@Injectable({
	providedIn: "root"
})
export class AuthService {

	constructor(
		private restService: NgSRestService,
		private pageService: NgSPageService
	) {
		const adminAuthenticationType: BearerAuthenticationType = new BearerAuthenticationType("admin");
		adminAuthenticationType.setToken(localStorage.getItem("adminToken") || "");
		adminAuthenticationType.onLogout = () => {
			localStorage.removeItem("adminToken");
			this.pageService.navigate("admin")
		}
		this.restService.addAuthenticationType(adminAuthenticationType);
	}

	public loginAsAdmin(token: String, expiration: Number, navigate: Boolean = true): void {
		localStorage.setItem("adminToken", token.toString());
		localStorage.setItem("adminExpiration", expiration.toString());
		(this.restService.getAuthenticationType("admin")! as BearerAuthenticationType).setToken(token);
		if (navigate) {
			this.pageService.navigate("admin/start")
		}
	}

	public isAdmin() {
		return localStorage.getItem("adminToken") != null && Number(localStorage.getItem("adminExpiration")) > Date.now();
	}

}