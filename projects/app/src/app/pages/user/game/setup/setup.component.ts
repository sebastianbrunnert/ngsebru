import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatchGame, Player, Setting } from "projects/app/src/app/core/models/MatchGame";
import { NgSForm, NgSLangService, NgSPageService, NgSRestService, NgSTextInput, RestBuilder } from "projects/ng-sebru-lib/src/public-api";

@Component({
    templateUrl: "./setup.component.html",
})
export class SetupGameComponent {

    public Setting = Setting

    public id: String = ""
    public game?: MatchGame

    public playersForm: NgSForm = new NgSForm()

    constructor(
        private route: ActivatedRoute,
        private restService: NgSRestService,
        private pageService: NgSPageService,
        private langService: NgSLangService
    ) {
        this.route.paramMap.subscribe(params => {
            this.id = params.get("id") as String
            new RestBuilder(this.restService).setUrl("game/" + this.id).get().then((matchGame: MatchGame) => {
                this.game = matchGame
                this.langService.getPromise().then(() => {

                    var numberOfUnnamedPlayers: number = 1
                    matchGame.players.forEach((player: Player, index: number) => {
                        if (player.name != "") {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation(player.name), "player-" + index))
                        } else if (this.game?.settings.includes(Setting.TEAM_MODE)) {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("TEAM") + " #" + (numberOfUnnamedPlayers++), "player-" + index))
                        } else {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("PLAYER") + " #" + (numberOfUnnamedPlayers++), "player-" + index))
                        }
                    })

                })
            }, () => {
                this.pageService.navigate("game/choose")
            })
        })
    }

}