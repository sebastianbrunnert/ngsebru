import { Component } from "@angular/core";
import { NgSForm, NgSPageService, NgSPasswordInput, NgSRestService, NgSTextInput, RestBuilder, Sha256Transformer } from "projects/ng-sebru-lib/src/public-api";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { AuthService } from "projects/app/src/app/core/services/auth.service";
import { AuthenticationCredentialsResponse } from "projects/app/src/app/core/models/Responses";

@Component({
    templateUrl: "./login.component.html"
})
export class UserLoginComponent {

    public form: NgSForm = new NgSForm(
        new NgSTextInput("INPUT_USERNAME_OR_EMAIL", "name"),
        new NgSPasswordInput("INPUT_PASSWORD", "password")
    )

    constructor(
        private socialAuthService: SocialAuthService,
        private restService: NgSRestService,
        private authService: AuthService,
        private pageService: NgSPageService
    ) {
        if (this.authService.isUser()) {
            this.pageService.navigate("")
            return
        }
        this.socialAuthService.initState.subscribe(() => {
            this.socialAuthService.authState.subscribe((socialUser: SocialUser) => {
                if (socialUser) {
                    new RestBuilder(this.restService).setUrl("authentication/google").setBody(socialUser.idToken).post().then((authenticationCredentialsResponse: AuthenticationCredentialsResponse) => {
                        this.authService.loginAsUser(authenticationCredentialsResponse.token)
                    })
                }
            })
        })

        this.form.onSubmit = () => {
            new RestBuilder(this.restService).setUrl("authentication/login").setInquirer(this.form).addParam("name", this.form.getNgSInput("name").value).addParam("hash", new Sha256Transformer(this.form.getNgSInput("password").value).result()).post().then((authenticationCredentialsResponse: AuthenticationCredentialsResponse) => {
                this.authService.loginAsUser(authenticationCredentialsResponse.token)
            })
        }
    }

}