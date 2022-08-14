import { Component } from "@angular/core";
import { NgSNavigation, NgSRestService } from "projects/ng-sebru-lib/src/public-api";

@Component({
    selector: "match-admin-navigation",
    templateUrl: "./navigation.component.html"
})
export class AdminNavigationComponent {

    constructor(
        private restService: NgSRestService
    ) { }

    public navigation: NgSNavigation = {
        titleHtml: "<span class='text-secondary'>match</span><span class='text-body-bg'>heroes</span>",
        items: [
            { title: "OVERVIEW", url: "admin/start", classes: ["text-body-bg", "rounded"] },
            { title: "GAMES", url: "admin/games", classes: ["text-body-bg", "rounded"] },
            { title: "LOGOUT", action: () => { this.restService.getAuthenticationType("admin")?.onLogout() }, classes: ["text-body-bg", "rounded"] }
        ],
        classes: ["bg-primary"],
        barsClasses: ["text-body-bg"]
    }

}