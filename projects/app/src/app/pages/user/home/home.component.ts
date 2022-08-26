import { Component } from "@angular/core";
import { NgSPageService } from "projects/ng-sebru-lib/src/public-api";
import { MatchGame } from "../../../core/models/MatchGame";
import { GameService } from "../../../core/services/game.service";

@Component({
	templateUrl: "./home.component.html"
})
export class HomeComponent {

	public games: MatchGame[] = []

	constructor(
		public pageService: NgSPageService,
		private gameService: GameService
	) {
		this.gameService.getGames().then((matchGames) => {
			this.games = matchGames
		})
	}

}