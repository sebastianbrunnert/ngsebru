import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSebruLibModule } from "projects/ng-sebru-lib/src/public-api";
import { LoginComponent } from "./login/login.component";
import { StartComponent } from "./start/start.component";
import { SuperAdminRoutingModule } from "./super-admin-routing.module";

@NgModule({
	declarations: [
		StartComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		SuperAdminRoutingModule,
		NgSebruLibModule
	]
})
export class SuperAdminModule { }