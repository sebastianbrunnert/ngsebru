import { Component } from "@angular/core";
import { NgSForm, NgSImageInput, NgSRestService, NgSTextInput, RestBuilder } from "projects/ng-sebru-lib/src/public-api";

@Component({
    templateUrl: "./games.component.html"
})
export class GamesComponent {

    public form: NgSForm = new NgSForm(
        new NgSTextInput("ID", "id"),
        new NgSImageInput("IMAGE", "image")
    )

    constructor(
        private ngSRestService: NgSRestService
    ) {
        this.form.onSubmit = () => {
            const formData: FormData = new FormData()
            formData.append("id", this.form.getNgSInput("id").value)
            formData.append("image", this.form.getNgSInput("image").value)
            new RestBuilder(this.ngSRestService).setUrl("game").addAuthenticationType("admin").setInquirer(this.form).setBody(formData).post().then(() => {
                this.form.reset()
            })
        }
    }

}