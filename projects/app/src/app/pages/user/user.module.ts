import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		UserRoutingModule
	]
})
export class UserModule { }