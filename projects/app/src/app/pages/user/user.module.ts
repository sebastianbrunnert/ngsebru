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
import { UserNavigationComponent } from "./navigation/navigation.component";
import { UserLoginComponent } from "./profile/login/login.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
	declarations: [
		UserNavigationComponent,
		UserLoginComponent,
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
		NgSebruLibModule,
	],
	providers: []
})
export class UserModule { }