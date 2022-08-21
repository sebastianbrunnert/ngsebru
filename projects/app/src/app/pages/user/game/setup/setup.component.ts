import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatchGame, Player, Setting, Timer } from "projects/app/src/app/core/models/MatchGame";
import { NgSForm, NgSInput, NgSLangService, NgSModalBuilder, NgSModalButton, NgSModalType, NgSNumberInput, NgSPageService, NgSRestService, NgSSelectInput, NgSTextInput, RestBuilder } from "projects/ng-sebru-lib/src/public-api";

@Component({
    templateUrl: "./setup.component.html",
})
export class SetupGameComponent {

    public Setting = Setting

    public id: String = ""
    public game?: MatchGame

    public playersForm: NgSForm = new NgSForm()
    public timersForm: NgSForm = new NgSForm()

    public editTimerModal: NgSModalBuilder = new NgSModalBuilder().setTitle("EDIT_TIMER").setType(NgSModalType.L)

    constructor(
        private route: ActivatedRoute,
        private restService: NgSRestService,
        private pageService: NgSPageService,
        private langService: NgSLangService
    ) {
        this.route.paramMap.subscribe(params => {
            this.route.queryParamMap.subscribe(queryParams => {
                this.id = params.get("id") as String
                const restBuilder: RestBuilder = new RestBuilder(this.restService).setUrl("game/" + this.id)
                // Check if Game is saved from User and load it
                if (queryParams.has("id")) {
                    restBuilder.addParam("id", queryParams.get("id") as String)
                }
                restBuilder.get().then((matchGame: MatchGame) => {
                    this.langService.getPromise().then(() => {
                        this.setupPlayersForm(matchGame)
                        this.setupTimersForm(matchGame)
                        this.game = Object.assign(new MatchGame(), matchGame)
                    })
                }, () => {
                    this.pageService.navigate("game/choose")
                })
            })
        })
    }

    public setupPlayersForm(matchGame: MatchGame) {
        this.playersForm.setSubmitable(false)
        matchGame.players.forEach((player: Player, index: number) => {
            if (player.title != "") {
                this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation(player.title), "player-" + index))
            } else if (matchGame.settings.includes(Setting.TEAM_MODE)) {
                this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("TEAM") + " #" + (index + 1), "player-" + index))
            } else {
                this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("PLAYER") + " #" + (index + 1), "player-" + index))
            }
            player.title = "player-" + index
        })
        this.playersForm.onSubmit = () => {
            this.playersForm.inputs.map((input: NgSInput) => input.value).forEach((value: String, index: number) => {
                // TODO: Editing Player as Action from MatchGame
                this.game!.players[index]!.name = value
            })
        }
    }

    public setupTimersForm(matchGame: MatchGame) {
        this.timersForm.setSubmitable(false)
        matchGame.timers.forEach((timer: Timer, index: number) => {
            const timerInput = new NgSNumberInput(this.langService.getTranslation(timer.title), "timer-" + index).setValue(timer.seconds as number / 60).setSuffix("MINUTES").setLabelButton("edit")
            timerInput.onLabelButtonClick = () => {
                // Open Modal when clicking on Timer Input
                const editTimerForm = new NgSForm(
                    new NgSTextInput("NAME", "name").setValue(timerInput.name),
                    new NgSSelectInput("TIME_UNIT", ["SECONDS", "MINUTES", "HOURS"], "timeUnit").setValue(timerInput.suffix)
                )
                editTimerForm.onSubmit = () => {
                    // Edit Timer Input when editing Modal and close the Modal
                    timerInput.name = editTimerForm.getNgSInput("name").value
                    timerInput.suffix = editTimerForm.getNgSInput("timeUnit").value
                    this.editTimerModal.close()
                }
                this.editTimerModal.setNgSForm(editTimerForm)
                this.editTimerModal.buttons = [
                    // Delete Timer Input when clicking on Delete Button and close Modal
                    new NgSModalButton("DELETE", false, () => {
                        this.game!.timers.splice(index, 1) // TODO: Removing Timer as Action from MatchGame
                        this.timersForm.inputs = this.timersForm.inputs.filter((input: NgSInput) => input != timerInput)
                        this.editTimerModal.close()
                    })
                ]
                this.editTimerModal.open()
            }
            this.timersForm.addNgSInput(timerInput)
        })
        this.timersForm.onSubmit = () => {
            this.timersForm.inputs.forEach((input: NgSNumberInput, index: number) => {
                // TODO: Editing Timer as Action from MatchGame
                this.game!.timers[index]!.seconds = input.value * (input.suffix == "MINUTES" ? 60 : (input.suffix == "HOURS" ? 3600 : 1))
                this.game!.timers[index]!.title = input.name
            })
        }
    }

    public start() {
        const feedbackPlayersForm: Boolean = this.playersForm.submit()
        const feedbackTimersForm: Boolean = this.timersForm.submit()
        if (feedbackPlayersForm && feedbackTimersForm) {
            console.log(this.game)
        }
    }

}