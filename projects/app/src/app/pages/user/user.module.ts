import { SocialLoginModule } from "@abacritt/angularx-social-login";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSebruLibModule } from "projects/ng-sebru-lib/src/public-api";
import { HomeComponent } from "./home/home.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		NgSebruLibModule,
		SocialLoginModule
	]
})
export class UserModule { }