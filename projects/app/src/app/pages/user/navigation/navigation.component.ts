import { Component } from "@angular/core";
import { NgSNavigation, NgSRestService, RestBuilder } from "projects/ng-sebru-lib/src/public-api";
import { MatchUser } from "../../../core/models/User";
import { AuthService } from "../../../core/services/auth.service";

@Component({
    selector: "match-user-navigation",
    templateUrl: "./navigation.component.html"
})
export class UserNavigationComponent {

    public navigation: NgSNavigation = {
        titleHtml: "<span class='text-secondary'>match</span><span class='text-primary'>heroes</span>",
        items: [],
        classes: ["px-3", "body-bg", "shadow-none"],
        barsClasses: []
    }

    constructor(
        private restService: NgSRestService,
        private authService: AuthService
    ) {
        if (this.authService.isUser()) {
            new RestBuilder(this.restService).setUrl("authentication/me").addAuthenticationType("user").get().then((matchUser: MatchUser) => {
                this.navigation.items?.push({
                    title: matchUser.name, url: "profile/me", classes: ["text-body", "rounded"], icon: "user"
                })
            })
        } else {
            this.navigation.items?.push({
                title: "LOGIN", url: "profile/login", classes: ["text-body", "rounded"], icon: "user"
            })
        }
    }

}