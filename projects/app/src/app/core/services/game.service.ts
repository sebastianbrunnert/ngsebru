import { Injectable } from "@angular/core";
import { NgSRestService, RestBuilder } from "projects/ng-sebru-lib/src/public-api";
import { MatchGame } from "../models/MatchGame";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class GameService {

    constructor(
        private restService: NgSRestService,
        private authService: AuthService
    ) { }

    public getGame(id: String): Promise<MatchGame> {
        return new Promise((resolve, reject) => {
            if (localStorage.getItem("GAME_" + id)) {
                const matchGame = Object.assign(new MatchGame(), JSON.parse(localStorage.getItem("GAME_" + id)!))
                if (!matchGame.gameMetaData.global) {
                    resolve(matchGame)
                    return
                }
            }

            new RestBuilder(this.restService).setUrl("game/" + id).addAuthenticationType("user").get().then((matchGame: MatchGame) => {
                matchGame = Object.assign(new MatchGame(), matchGame)
                if (!matchGame.gameMetaData.global) {
                    let games = localStorage.getItem("games") ? JSON.parse(localStorage.getItem("games")!) : []
                    games.push(matchGame.id)
                    localStorage.setItem("games", JSON.stringify(games))
                    localStorage.setItem("GAME_" + matchGame.id, JSON.stringify(matchGame))
                }
                resolve(matchGame)
            }, () => {
                reject()
            })
        })
    }

    public getGames(): Promise<MatchGame[]> {
        return new Promise((resolve, reject) => {
            let games: MatchGame[] = []
            if (this.authService.isUser()) {
                new RestBuilder(this.restService).setUrl("game").addAuthenticationType("user").get().then((matchGames: MatchGame[]) => {
                    games = games.concat(matchGames)
                    resolve(games)
                })
            } else {
                resolve(games)
            }
        })
    }
}