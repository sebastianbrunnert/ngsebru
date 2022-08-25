import { Component } from "@angular/core";
import { NgSForm, NgSPageService, NgSPasswordInput, NgSRestService, NgSTextInput, RestBuilder, Sha256Transformer } from "projects/ng-sebru-lib/src/public-api";
import { AuthService } from "projects/app/src/app/core/services/auth.service";
import { AuthenticationCredentialsResponse } from "projects/app/src/app/core/models/Responses";
import { NativeUser } from "projects/app/src/app/core/models/User";

@Component({
    templateUrl: "./register.component.html"
})
export class UserRegisterComponent {

    public form: NgSForm = new NgSForm(
        new NgSTextInput("INPUT_USERNAME", "name"),
        new NgSTextInput("INPUT_EMAIL", "email"),
        new NgSPasswordInput("INPUT_PASSWORD", "password")
    )

    constructor(
        private restService: NgSRestService,
        private authService: AuthService,
        private pageService: NgSPageService
    ) {
        if (this.authService.isUser()) {
            this.pageService.navigate("")
            return
        }

        this.form.onSubmit = () => {
            const nativeUser: NativeUser = new NativeUser()
            nativeUser.email = this.form.getNgSInput("email").value
            nativeUser.name = this.form.getNgSInput("name").value
            nativeUser.hash = new Sha256Transformer(this.form.getNgSInput("password").value).result()
            new RestBuilder(this.restService).setUrl("authentication/register").setInquirer(this.form).setBody(nativeUser).post().then((authenticationCredentialsResponse: AuthenticationCredentialsResponse) => {
                this.authService.loginAsUser(authenticationCredentialsResponse.token)
            })
        }
    }

}