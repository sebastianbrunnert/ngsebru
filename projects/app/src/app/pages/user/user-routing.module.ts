import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChooseGameComponent } from "./game/choose/choose.component";
import { SetupGameComponent } from "./game/setup/setup.component";
import { HomeComponent } from "./home/home.component";
import { UserLoginComponent } from "./profile/login/login.component";
import { UserRegisterComponent } from "./profile/register/register.component";

const routes: Routes = [
	{ path: "game/choose", component: ChooseGameComponent },
	{ path: "game/setup/:id", component: SetupGameComponent },
	{ path: "profile/login", component: UserLoginComponent },
	{ path: "profile/register", component: UserRegisterComponent },
	{ path: "**", component: HomeComponent }
]

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class UserRoutingModule { }