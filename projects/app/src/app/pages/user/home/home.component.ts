import { Component } from "@angular/core";
import { NgSLangService } from "projects/ng-sebru-lib/src/public-api";

@Component({
	template: "Hello World"
})
export class HomeComponent {


	constructor(
		private langService: NgSLangService
	) {

	}

}