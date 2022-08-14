import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GamesComponent } from "./games/games.component";
import { LoginComponent } from "./login/login.component";
import { StartComponent } from "./start/start.component";

const routes: Routes = [
	{ path: "start", component: StartComponent },
	{ path: "games", component: GamesComponent },
	{ path: "**", component: LoginComponent }
]

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }