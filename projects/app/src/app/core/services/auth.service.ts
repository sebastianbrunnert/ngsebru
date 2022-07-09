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
		const superAdminAuthenticationType: BearerAuthenticationType = new BearerAuthenticationType("superAdmin");
		superAdminAuthenticationType.setToken(localStorage.getItem("superAdminToken") || "");
		superAdminAuthenticationType.onLogout = () => {
			localStorage.removeItem("superAdminToken");
			this.pageService.navigate("super-admin")
		}
		this.restService.addAuthenticationType(superAdminAuthenticationType);
	}

	public loginAsSuperAdmin(token: string, expiration: Number, navigate: Boolean = true): void {
		localStorage.setItem("superAdminToken", token);
		localStorage.setItem("superAdminExpiration", expiration.toString());
		(this.restService.getAuthenticationType("superAdmin")! as BearerAuthenticationType).setToken(token);
		if(navigate) {
			this.pageService.navigate("super-admin/start")
		}
	}

	public isSuperAdmin() {
		return localStorage.getItem("superAdminToken") != null && Number(localStorage.getItem("superAdminExpiration")) > Date.now();
	}

}