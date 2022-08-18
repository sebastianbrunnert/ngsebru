import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgSebruLibModule } from "projects/ng-sebru-lib/src/public-api";
import { ChooseGameComponent } from "./game/choose/choose.component";
import { SetupGameComponent } from "./game/setup/setup.component";
import { BasketballGame } from "./game/templates/basketball.component";
import { DartsGame } from "./game/templates/darts.component";
import { SoccerGame } from "./game/templates/soccer.component";
import { TennisGame } from "./game/templates/tennis.component";
import { HomeComponent } from "./home/home.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
	declarations: [
		HomeComponent,
		ChooseGameComponent,
		SetupGameComponent,
		SoccerGame,
		BasketballGame,
		DartsGame,
		TennisGame
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		NgSebruLibModule
	]
})
export class UserModule { }