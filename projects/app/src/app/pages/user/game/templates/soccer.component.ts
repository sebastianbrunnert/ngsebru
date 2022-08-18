import { Component } from "@angular/core";
import { Game } from "projects/app/src/app/core/decorators/Game";

@Game({
    id: "soccer",
    image: "assets/icons/soccer_o.png",
    sort: 1
})
@Component({
    template: ""
})
export class SoccerGame {

}