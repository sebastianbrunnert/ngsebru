import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatchGame, Player, Setting, Timer } from "projects/app/src/app/core/models/MatchGame";
import { Confirmable, NgSForm, NgSInput, NgSLangService, NgSModalBuilder, NgSModalButton, NgSModalType, NgSNumberInput, NgSPageService, NgSRestService, NgSSelectInput, NgSTextInput, RestBuilder } from "projects/ng-sebru-lib/src/public-api";

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
            this.id = params.get("id") as String
            new RestBuilder(this.restService).setUrl("game/" + this.id).get().then((matchGame: MatchGame) => {
                this.langService.getPromise().then(() => {

                    var numberOfUnnamedPlayers: number = 1
                    this.playersForm.setSubmitable(false)
                    matchGame.players.forEach((player: Player, index: number) => {
                        if (player.name != "") {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation(player.name), "player-" + index))
                        } else if (matchGame.settings.includes(Setting.TEAM_MODE)) {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("TEAM") + " #" + (numberOfUnnamedPlayers++), "player-" + index))
                        } else {
                            this.playersForm.addNgSInput(new NgSTextInput(this.langService.getTranslation("PLAYER") + " #" + (numberOfUnnamedPlayers++), "player-" + index))
                        }
                    })

                    this.timersForm.setSubmitable(false)
                    matchGame.timers.forEach((timer: Timer, index: number) => {
                        const timerInput = new NgSNumberInput(this.langService.getTranslation(timer.title), "timer-" + index).setValue(timer.seconds as number / 60).setSuffix("MINUTES").setLabelButton("edit")
                        timerInput.onLabelButtonClick = () => {
                            const editTimerForm = new NgSForm(
                                new NgSTextInput("NAME", "name").setValue(timerInput.name),
                                new NgSSelectInput("TIME_UNIT", ["SECONDS", "MINUTES", "HOURS"], "timeUnit").setValue(timerInput.suffix)
                            )
                            editTimerForm.onSubmit = () => {
                                timerInput.name = editTimerForm.getNgSInput("name").value
                                timerInput.suffix = editTimerForm.getNgSInput("timeUnit").value
                                this.editTimerModal.close()
                            }
                            this.editTimerModal.setNgSForm(editTimerForm)
                            this.editTimerModal.buttons = [
                                new NgSModalButton("DELETE", false, () => {
                                    this.timersForm.inputs = this.timersForm.inputs.filter((input: NgSInput) => input != timerInput)
                                    this.editTimerModal.close()
                                })
                            ]
                            this.editTimerModal.open()
                        }
                        this.timersForm.addNgSInput(timerInput)
                    })

                    this.game = matchGame
                })
            }, () => {
                this.pageService.navigate("game/choose")
            })
        })
    }

    public start() {
        console.log(this.game)
    }

}