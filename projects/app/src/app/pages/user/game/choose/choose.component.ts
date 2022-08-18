import { Component } from "@angular/core";
import { NgSPageService } from "projects/ng-sebru-lib/src/public-api";
import { GameWrapper, registeredGames } from "../../../../core/decorators/Game";

@Component({
	templateUrl: "./choose.component.html"
})
export class ChooseGameComponent {

	public games: GameWrapper[] = registeredGames.sort((a, b) => a.sort as number - (b.sort as number))

	constructor(
		public pageService: NgSPageService
	) { }

}