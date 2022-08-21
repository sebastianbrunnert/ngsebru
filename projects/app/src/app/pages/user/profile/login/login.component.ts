import { Component } from "@angular/core";
import { NgSForm, NgSPasswordInput, NgSRestService, NgSTextInput, RestBuilder } from "projects/ng-sebru-lib/src/public-api";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { AuthenticationCredentialsResponse } from "projects/app/src/app/core/models/Responses";
import { AuthService } from "projects/app/src/app/core/services/auth.service";

@Component({
    templateUrl: "./login.component.html"
})
export class UserLoginComponent {

    public form: NgSForm = new NgSForm(
        new NgSTextInput("INPUT_NAME_OR_EMAIL", "name"),
        new NgSPasswordInput("INPUT_PASSWORD", "password")
    )

    constructor(
        private socialAuthService: SocialAuthService,
        private restService: NgSRestService,
        private authService: AuthService
    ) {
        this.socialAuthService.initState.subscribe(() => {
            this.socialAuthService.authState.subscribe((socialUser: SocialUser) => {
                if (socialUser) {
                    new RestBuilder(this.restService).setUrl("authentication/google").setBody(socialUser.idToken).post().then((authenticationCredentialsResponse: AuthenticationCredentialsResponse) => {
                        this.authService.loginAsUser(authenticationCredentialsResponse.token)
                    })
                }
            })
        })
    }

    public loginWithGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    }

}