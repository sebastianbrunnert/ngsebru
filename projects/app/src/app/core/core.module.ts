import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { GameService } from "./services/game.service";

@NgModule({
	declarations: [],
	providers: [
		AuthService,
		GameService
	],
	imports: [
		CommonModule
	],
	exports: []
})
export class CoreModule { }