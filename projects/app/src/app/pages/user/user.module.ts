import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from "@abacritt/angularx-social-login";
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
import { UserRegisterComponent } from "./profile/register/register.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
	declarations: [
		UserNavigationComponent,
		UserLoginComponent,
		UserRegisterComponent,
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
		SocialLoginModule
	],
	providers: [
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(
							'818504442604-277dcuefp1kbfqf89896o26s35veujon.apps.googleusercontent.com'
						)
					},
				]
			} as SocialAuthServiceConfig,
		}
	],
})
export class UserModule { }