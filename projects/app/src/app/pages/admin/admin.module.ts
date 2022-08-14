import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSebruLibModule } from "projects/ng-sebru-lib/src/public-api";
import { LoginComponent } from "./login/login.component";
import { StartComponent } from "./start/start.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
	declarations: [
		StartComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		NgSebruLibModule
	]
})
export class AdminModule { }