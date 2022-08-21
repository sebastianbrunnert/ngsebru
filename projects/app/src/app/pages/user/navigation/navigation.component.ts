import { Component } from "@angular/core";
import { NgSNavigation } from "projects/ng-sebru-lib/src/public-api";

@Component({
    selector: "match-user-navigation",
    templateUrl: "./navigation.component.html"
})
export class UserNavigationComponent {

    constructor() { }

    public navigation: NgSNavigation = {
        titleHtml: "<span class='text-secondary'>match</span><span class='text-primary'>heroes</span>",
        items: [
            { title: "LOGIN", url: "profile/login", classes: ["text-body", "rounded"] },
        ],
        classes: ["px-3", "body-bg", "shadow-none"],
        barsClasses: []
    }

}